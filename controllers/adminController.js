const sequelize = require('../config/database');
const Admin = require('../models/admin')(sequelize);
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class AdminController {
    static async register (req, res) {
        try {
            const { username, password } = req.body
            const convertUsername = username.toLowerCase()
            if (!username || !password) {
                res.status(400).json({
                    message: 'Please input username and password'
                })
            } else {
                const data = await Admin.findOne({where: {username: convertUsername}})
                console.log(data);
    
                if (data) {
                    res.status(400).json({
                        message: 'Username already exist'
                    })
                } else {
                    const newAdmin = {
                        id: uuidv4(),
                        username: convertUsername,
                        password: bcrypt.hashSync(password, 10)
                    }
                    await Admin.create(newAdmin)
                    res.status(201).json({
                        message: 'Register Success'
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }

    static async login (req ,res) {
        try {
            const { username, password } = req.body
        const convertUsername = username.toLowerCase()
        if (!username || !password) {
            res.status(400).json({
                message: 'Please input username and password'
            })
        } else {
            const user = await Admin.findOne({where: {username: convertUsername}})
            if (!user) {
                res.status(400).json({
                    message: 'Invalid Username or Password'
                })
            } else {
                const checkPassword = bcrypt.compareSync(password, user.password)
                if (checkPassword) {
                    const payload = {
                        id: user.id,
                        username: user.username
                    }
                    const secretKey = process.env.SECRET_KEY
                    console.log(secretKey);
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})
                    res.status(200).json({
                        message: 'Login Success',
                        token
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid Username or Password'
                    })
                }
            }
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = AdminController;