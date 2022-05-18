require('dotenv').config();
const cors = require('cors')
const { PORT } = process.env;
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
const { sessionLogger, userName } = require('./middleware/sessionLogger');

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
// Импортируем созданный в отдельный файлах рутеры.
const app = express();
// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
hbs.registerPartials(`${__dirname}/views/partials`);
// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

app.use(cors())

const sessionConfig = {
  store: new FileStore(),
  name: 'MyCookieName',
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
app.use(userName);
app.use(sessionLogger);

app.use('/', mainRouter);
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
