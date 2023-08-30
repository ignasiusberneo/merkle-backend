const sequelize = require('../config/database');
const Guest = require('../models/guest')(sequelize);
const { v4: uuidv4 } = require('uuid');


class GuestController {
    static async addGuest (req, res) {
        try {
            const { name, address, phone_number, note  } = req.body
            const newUser = {
                id: uuidv4(),
                name,
                address,
                phone_number,
                note
            }
            await Guest.create(newUser)
            res.status(201).json({
                message: 'Add Guest Success'
            })
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({
                    message: error.errors[0].message,
                });
            } else {
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        }
    }

    static async showGuest(req, res) {
        try {
            const data = await Guest.findAll({attributes: ['name', 'note']})
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

module.exports = GuestController;