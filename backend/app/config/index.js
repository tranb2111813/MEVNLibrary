const config = {
  app: {
    port: process.env.PORT || 3003,
    jwtSecret: process.env.JWT_SECRET || "qưertyuiopcfgykcfghvhmcf",
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/quanlythuvien",
  },
};
module.exports = config;
