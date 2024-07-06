const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtsecret = "Thisprojectisvjfoodsmadebyme@123" //Any 32-bit string is fine

router.post('/createuser',
    body('email').isEmail(),//Checks if email is valid mail
    body('password', 'Incorrect password').isLength({ min: 5 }),//Checks if password is atleast 5 letters
    //We can also send some specific message like Incorrect password as in here
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });

        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location,
            })
            res.json({ success: true });
        }
        catch (e) {
            console.log("Error in create user route", e);
            res.json({ success: false });
        }
    })


router.post('/loginuser',
    body('email').isEmail(),//Checks if email is valid mail
    body('password', 'Incorrect password').isLength({ min: 5 }),//Checks if password is atleast 5 letters
    //We can also send some specific message like Incorrect password as in here
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "User not found!" })
            }
            const validPass = await bcrypt.compare(req.body.password, userData.password);
            if (!validPass) {
                return res.status(400).json({ errors: "Invalid password" })
            }
            const data = {
                user: {
                    id: userData._id
                }
            }
            //Different authToken is generated everytime we try to login
            const authToken = jwt.sign(data, jwtsecret);
            return res.json({ success: true, authToken: authToken });
        }
        catch (e) {
            console.log("Error in create user route", e);
            res.json({ success: false });
        }
    })


module.exports = router;
