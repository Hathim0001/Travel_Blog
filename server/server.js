require('dotenv').config();

const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.start().then(() => server.applyMiddleware({ app }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

db.on('error', (err) => console.error('MongoDB connection error:', err.message));
db.once('open', () => console.log('✅ Connected to MongoDB!'));

app.listen(PORT, () => {
  console.log(`🌍 Server active at http://localhost:${PORT}`);
  console.log(`🚀 GraphQL Playground ready at http://localhost:${PORT}${server.graphqlPath}`);
});