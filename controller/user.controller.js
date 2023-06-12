const db = require('../db')

class UserController {

    async getUsers(req, res){
        const users = await db.query('SELECT * FROM \"User\"')
        res.json(users.rows)
    }
    async getOneUser(req, res){
        const id = req.params.id
        const user = await db.query('SELECT * FROM \"User\" WHERE "ID" = $1', [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res){
        const {Id, Email, Password} = req.body
        const user = await db.query('UPDATE "\User"\ SET "Email" = $2, "Password" = $3 WHERE "ID" = $1 AND "IsDelete" = False RETURNING *', [Id, Email, Password])
        res.json(user.rows[0])
    }
    async deleteUser(req, res){
        const id = req.params.id

        const user = await db.query('UPDATE \"User\" SET "IsDelete" = True WHERE "ID" = $1 AND "IsDelete" = False', [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()