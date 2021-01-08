const mongoose = require("mongoose");
const { db } = require("../configuration");

//см. https://mongoosejs.com/docs/
module.exports.connectDb = () => {  //что коннектить к базе данных
  mongoose.connect(db, { useNewUrlParser: true });   //db это 'mongodb://localhost/test'. Он декларируется в переменных окружения, прописанных в docker-compose.yml.

  //вышеописннная команда создает внутри mongoose ".connection", который мы ретерним наружу и далее с ним работаем в коде express'a.
  return mongoose.connection;
};
//module.exports.connectDb аналогичен const db из туториала(https://mongoosejs.com/docs/).


//Точка вывода bd - 'mongodb://localhost/test',
//но мы выводим что? Где сама bd?