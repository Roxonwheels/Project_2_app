const MONGO_URI = process.env.MONGODB_URI || `mongodb+srv://Rox:12345@cluster0.rydhi.mongodb.net/projectApp?retryWrites=true&w=majority`;

module.exports = MONGO_URI;
