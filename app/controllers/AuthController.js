const { user } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

exports.signIn = (req, res) => {
    let { email, password } = req.body;

    // Buscar usuario
    user.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            res.status(404).json({ msg: "Usuario con este correo no encontrado" });
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                // Creamos el token
                let token = jwt.sign({ user: user }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                res.json({
                    user: user,
                    token: token
                })
            } else {
                // Unauthorized Access
                res.status(401).json({ msg: "Contraseña incorrecta" })
            }
        }
    }).catch(err => {
        res.status(500).json(err);
    })
}

// REGISTER
exports.signUp = (req, res) => {

    // Encriptar el password
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    // let password = bcrypt.hashSync(req.body.password, 10);
    // let password = '123456';
    // console.log(req.body.password);
    // Crear el usuario
    user.create({
        name: req.body.name,
        email: req.body.email,
        password: password
    }).then(user => {
        // Creamos un token
        let token = jwt.sign({ user: user }, authConfig.secret, { expiresIn: authConfig.expires });

        res.json({
            user: user,
            token: token
        });
    }).catch(err => {
        res.status(400).json(err);
    });
}

// module.exports = {
//     // LOGIN
//     signIn(req, res) {

//     },

//     // REGISTER
//     signUp(req, res) {
//         // // Encriptar el password
//         // // let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
//         // // let password = bcrypt.hashSync(req.body.password, 10);
//         // let password = '123456';
//         // console.log(req.body.password);
//         // // Crear el usuario
//         // user.create({
//         //     name: req.body.name,
//         //     email: req.body.email,
//         //     password: password
//         // }).then(user => {
//         //     // Creamos un token
//         //     let token = jwt.sign({ user: user }, authConfig.secret, { expiresIn: authConfig.expires });

//         //     res.json({
//         //         user: user,
//         //         token: token
//         //     });
//         // }).catch(err => {
//         //     res.status(400).json(err);
//         // });
//         res.json({
//             ok: true,
//             menssage: req.body.name
//         });
//         console.log(req.body.email);
//     }
// }