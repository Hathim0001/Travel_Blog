const { User, Post, Comment, Place } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('friends')
          .populate('savedPlaces');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')
        .populate('friends')
        .populate('savedPlaces');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('posts')
        .populate('friends')
        .populate('savedPlaces');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      try {
        const post = await Post.findOne({ _id });
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { input, userId }, context) => {
      if (context.user) {
        if (context.user._id === userId) {
          const user = await User.findByIdAndUpdate(userId, { ...input }, { new: true })
            .select('-__v -password');
          const token = signToken(user);
          return { token, user };
        }
        throw new AuthenticationError('You do not have permission to do that');
      }
      throw new AuthenticationError('You need to be logged in');
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({ ...args, username: context.user.username, author: context.user._id });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
        return post;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findById(postId);
        await post.delete();
        return 'Post successfully deleted';
      }
      throw new AuthenticationError('You need to be logged in');
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentBody,
          username: context.user.username,
          post: postId,
          author: context.user._id,
        });
        await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: comment._id } },
          { new: true }
        );
        return comment;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    deleteComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        await comment.delete();
        await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { comments: commentId } },
          { new: true }
        );
        return 'Comment successfully deleted';
      }
      throw new AuthenticationError('You need to be logged in');
    },
    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === context.user.username)) {
            post.likes = post.likes.filter((like) => like.username !== context.user.username);
          } else {
            post.likes.push({
              username: context.user.username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else {
          throw new Error('Post not found');
        }
      }
      throw new AuthenticationError('You need to be logged in');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true }
        ).populate('friends');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    savePlace: async (parent, { placeId }, context) => {
      if (context.user) {
        const place = await Place.findOne({ placeId });
        if (!place) {
          throw new Error('Place not found');
        }
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPlaces: place._id } },
          { new: true }
        ).populate('savedPlaces');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    removePlace: async (parent, { placeId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPlaces: placeId } },
          { new: true }
        ).populate('savedPlaces');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
  },
};

module.exports = resolvers;