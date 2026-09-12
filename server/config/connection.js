const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://22pw33_db_user:b0YRGdelax57rE3m@travelblog.agji3xv.mongodb.net/?appName=travelblog';

console.log('Connecting to MongoDB database...');

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).catch((err) => {
  console.error('⚠️  Primary MongoDB connection error:', err.message);
  console.log('🔄 Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/trip-tide)...');
  mongoose.connect('mongodb://127.0.0.1:27017/trip-tide', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((fallbackErr) => {
    console.error('❌ Local MongoDB connection error:', fallbackErr.message);
    console.error('\n📌 Action Needed: Please create a server/.env file with a valid MONGODB_URI (e.g. your own MongoDB Atlas connection string or start local MongoDB service).\n');
  });
});

module.exports = mongoose.connection;