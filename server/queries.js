const Pool = require('pg').Pool
const pool = new Pool({
    user: 'bilaljs',
    host: 'localhost',
    database: 'bilal_test',
    password: 'bilal123456',
    port: 5432
})

/////////// Get all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

////////// Get by ID
const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, result) => {
        if(err){
            throw err
        }
        // res.status(200).json(result.rows)
        res.status(200).send(result.rows)
    })
}

////////// Creating a user
const createUser = (req, res) => {
    const {name, email} = req.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (err, result) => {
        if(err){
            throw err
        }
        // res.status(200).send(`User added with ID: ${name}`)
        // res.status(200).send(`User added with ID: ${result.rowCount}`)
        pool.query('SELECT *FROM users ORDER BY id ASC', (err, result) => {
            if(err){
                throw err
            }
            res.status(200).send(`User is created with ID: ${result.rowCount}`)
        })
    })
}

////////// Update a User
const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, email} = req.body
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', 
    [name, email, id], (err, result) => {
        if(err){
            throw err
        }
        res.status(200).send(`User is updated with ID: ${id}`)
    }
    )
}

////////// Delete a User
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
        if(err){
            throw err
        }
        res.status(200).send(`User is deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}