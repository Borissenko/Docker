//это сервер express. simple-вариант.
//он отдает примитивный фронтендовский код по определенным роутам,
//которые открывает через порт 3000.

const express = require("express");

console.log('PORT', process.env.PORT)  // process.env.PORT=3000

//эти переменные мы объявили в docker-compose.yml
const port = process.env.PORT;   //внутренний порт Dockerfile, 3000
const host = process.env.HOST;   //внешний порт docker-compose

const app = express();

//2.
//после запуска сервера
//на порту 3000 по роуту /test
//откроется страничка с надписью "Our api server is working correctly".
app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});


//1.
//при запуске сервера
//npm run node src/index.js
//сервер будет выводить свои роуты через порт 3000,
//а в консоле мы увидем "Started api service"
app.listen(port, () => {                                  //port у нас равен 3000
  console.log(`Started api service on port ${port}`);
  console.log(`Our host is ${host}`);
});



//et('/')







