//express + MongoDB via mongoose.

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require('body-parser')         //(!) Обязателен для всех запросов, которые имеют pl.
const { port, host, MONGO_URL, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");   // это mongoose.connection

const app = express();                         //1. запуск сервераconst bodyParser = require('body-parser')         //(!) Обязателен для всех запросов, которые имеют pl.
app.use(bodyParser.json())

const kittySchema = new mongoose.Schema({                    //=1. Декларация схемы MongoDB, kittySchema- имя произвольное.
  name: String
})
const Kitten = mongoose.model("Kitten", kittySchema);  //=2. Декларация модели MongoDB на базе схемы.
                                                             // Что такое ("Kitten", ...) - непонятно. Имя модели?

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
})


app.get("/testwithcurrentuser", (req, res) => {
   //console.log('authApiUrl==', authApiUrl)  //console.log НАДО писать, если axios не прописан(!).
  
   axios.get (authApiUrl + "/kola")
     .then(responseFromAuth => {
    //AUTH_API_URL=http://auth:3002/api,
    // т.е. в auth/index.js идет запрос на - http://auth:3002/api/kola.
    
    //получаем response от auth-сервиса и далее, без проверки, что получили, api-сервис высылает свой респонс "res"
    //в виде json-объекта, вставляя в него responseFromAuth.
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: responseFromAuth.data
    })
   })
})


const startServer = () => {
  app.listen(port, () => {                      //3. старт прослушивания порта 3001 by запущенным сервером
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url is ${MONGO_URL}`);

    const silence = new Kitten({ name: "Go!" });    //=3. Создание экземпляра модели с конкретными данными.
    // доп-но здесь автоматически прописывается поле _id(!).
   // { name: "Go!" } - это еще не сохранение в bd, но предоставление объекта для сохранения.
    console.log('silence=', silence)
    //=  выведется { _id: 5ef32ed2b2b05f0011099056, name: 'Go!'}
    //то, что дописалось поле _id, говорит, что объект трансформирован в экземпляр модели.


    silence.save(function(err, savedData) {                 //=4. сохраняем экземпляр модели в bd.
      if (err) return console.error(err);
      console.log("savedData==", savedData);
      //= savedData={ _id: 5ef32ed2b2b05f0011099056, name: 'Go!', __v: 0 }
    });
    //collback в silence.save при сохранении экземпляра модели с именем silence - не важен.
    //мы сделали просто silence.save(), и { name: "Go!" } в bd - сохранился.
    //То, что объет сохранился, говорит появившаяся приписачка "__v: 0 " - версия сохранения.

  });
};

//2. запускаем mongoose и после формирования соединения между mongoose и ...... стартуем у сервера прослушивание им своего порта 3001.
connectDb()    //см. https://mongoosejs.com/docs/ .
  .on("error", console.log)
  .on("disconnected", connectDb)   //если рассоединились, то запускаем соединение заново
  .once("open", startServer);      //когда коннект с bd установлен мы стартуем процесс прослушивания у запущенного сервера сервер.
