const mongoose = require("mongoose");
const { MONGO_URL } = require("../configuration");

//см. https://mongoosejs.com/docs/
module.exports.connectDb = () => {  //что коннектить к базе данных
  mongoose.connect(MONGO_URL, { useNewUrlParser: true });   //db это 'mongodb://localhost/test'. Он декларируется в переменных окружения, прописанных в docker-compose.yml.

  //вышеописннная команда "mongoose.connect" создаET внутри mongoose второй, ПОХОЖИЙ(будь внимателен!) по названию, метод - ".connection", который мы и ретерним наружу и далее с ним работаем в коде express'a.
  return mongoose.connection;
};
//module.exports.connectDb аналогичен const db из туториала(https://mongoosejs.com/docs/).



//Точка вывода bd - 'mongodb://localhost/test',
//но мы выводим что? Где сама bd?