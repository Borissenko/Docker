//мы их декларируем в docker-compose.yml
module.exports.port = process.env.PORT;
module.exports.host = process.env.HOST;
module.exports.MONGO_URL = process.env.MONGO_URL;
module.exports.authApiUrl = process.env.AUTH_API_URL;
