const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')  // импорт с api

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))  // прослойка для дебага 
app.use(cors())                // позволяет запускать сервер на одном порте . кроссдоменные запросы
app.use(express.json())

app.use('/api/contacts', contactsRouter)  // пересматривает код в папки api.contacts  , api/contacts уже не нужен нужен только /

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })   // прослойка чтоб приходил json а не html 50 мин 1 видео
})

app.use((err, req, res, next) => {        // ловит ошибки 
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message, })       // запрос выпониться в любом случае  но остановиться на этом ,если вызвать некст то запрос пойдет дальше
})

module.exports = app
