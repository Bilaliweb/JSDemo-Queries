const express  = require('express')
const { Sequelize } = require('sequelize')
const bodyParser = require('body-parser')
const db = require('./queries')

const app = express()
const port = 3000
const sequelize = new Sequelize('postgres', 'bilaljs', 'bilal123456', {
    host: 'localhost',
    dialect: 'postgres'
})

///////////// Check Connection
try{
    sequelize.authenticate()
    console.log('Connection established successfully...')
    app.listen(port, () => {
        console.log(`App is running on this port ${port}`)
    })
}
catch (error){
    console.error('Unable to connect to database...', error)
}

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true
})
)

app.get('/', (req, res) => {
    res.json(
        {
            info: 'Making CRUD in Node.js with PSQL after a long time'
        }
    )
})

////////////// All CRUD API's
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users:id', db.deleteUser)
