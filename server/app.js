if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
var cors = require('cors')
const Port = process.env.PORT || 3003
const app = express()
const route = require('./routers/index')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', route)

// module.exports = app

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
})