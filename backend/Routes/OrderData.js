const express = require('express');
const router = express.Router();
const order = require("../models/Orders");
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("post request", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await order.findOne({ 'email': req.body.email })
    console.log("post request",eId)
    if (eId === null) {
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send(error.message);
        }
    }
    else {
        try {
            await order.findOneAndUpdate({email:req.body.email},{ $push:{order_data: data} })
            .then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }
})
module.exports = router;