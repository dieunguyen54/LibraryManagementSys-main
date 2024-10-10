const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const secretKey = 'quantrinh';
//const cookieParser = require('cookie-parser');

class LoginController {
    async login(req, res) {
        const { email, password } = req.body;
        //console.log(req)
        try {
            const user = await db.user.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid email or password',
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Invalid email or password',
                });
            }
            const token = jwt.sign({ userId: user.user_id, roleId: user.role_id }, secretKey, {
                expiresIn: '1h',
            });
            res.cookie('auth_token', token, { httpOnly: true });
            return res.status(200).json({
                user,
                token: token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}

module.exports = new LoginController;
