const mongoose = require("mongoose")
const mongoURL = 'mongodb://localhost/vjEats';
const mongobd = async () => {
  try {
    const conn = await mongoose.connect(mongoURL, { useNewUrlParser: true, });
    console.log('MongoDB Connected');
    const foodData = await mongoose.connection.db.collection("foodData").find({}).toArray();
    const foodCategories = await mongoose.connection.db.collection("foodCategories").find({}).toArray()
    const Orders = await mongoose.connection.db.collection("Orders").find({}).toArray()
    global.foodData = foodData;
    global.foodCategories = foodCategories;
    global.Orders = Orders;
  }
  catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = mongobd;
//global variables can be anywhere inside the application

