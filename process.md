-Extensions required-auto rename, thunder client(works like postman), ES& React/Redux, Icons
-To create a new react project-
    npx create-react-app myapp
    cd myapp
    npm start
-This steps runs this project in https://localhost:3000/
-change the title of this webpage to <YourProjectName> in index.html in public
-To import bootstrap into this:
    from bootsrap copy links for css and script and add them in public->index.html head and end of body resply
    In head:
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    At the end of body:
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
You can also install boostarp 5 using npm i react-bootstrap command 
-Create folder components and inside it, files called Navbar.js,Footer.js,Box.js,Carousel.js
-Create another folder screens  and inside it Home.js, Login.js
-Type command rfc to get template  for class based component
-These components are reusable. Create another folder screens which consists all windows we can open in our webpage.We can use components in these screens.
-Replace class with className, href="#" with to="/", <a></a>with <Link></Link>, navbar-dark,bg-success
-For using Link we need to import that.
    import { Link} from "react-router-dom";
-We need to wrap  our App.js in BrowserRouter so that all the routes will work.
    import {
        BrowserRouter as Router,
        Routes,
        Route,
    } from "react-router-dom";
-Inside Router add Routes then put Route..Each Route will have exact path which indicates the url and the element in which we put the elements to be rendered.
-Make required modifications to components files.Import sourcee code from boostrap and make modification accordingly.
-In Box.js---><select></select> is like a button. Options are like drop down from that button. Options have key,value. 
    options can be static. Eg:<option value="half">Half</option>
                              <option value="full">Full</option>
    We can also javascript to create dymanic options. 
                     Eg:<select className="m-2 h-100 bg-success rounded">
                        {Array.from(Array(6), (e, i) => {
                        return (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                        )
                        })}</select>
                        This generates dropdown with options 1,2,3,4,5.
-In Carousel.js use img src as links by copying image address from online sources
-Put a search bar at the center bottom of carousel. You can get source code for that from bootstrap navbar serach bar page.Make changes like margins,display to inline for required modifications.
-Carousel images can be styled by using <img src="...." className="...." style={{"height":"30px","objectFit":"contain"}} /> -->style is like an json object
-Import data into mongobd compass
#### Remove "/" before node_modules under #dependencies in .gitignore file. This will help a lot if we want to post this project on github
-Set up express.
    -Create new folder backend
    -cd backend -npm init (to initialize node)  -npm i express nodemon mongoose
    -create new file in backend folder-index.js
    -Open new terminal,cd to myapp/backend. nodemon index.js
-Create another file db.js
    -Create a function (mongobd) that generates connection to database .Export this function
    -Import this file,i.e the function gets impoted into the index.js. Call the function mongodb to create connection.
    -Try fetching some data to check if the connection is made properly.
-Create  models folder in backend and add file user.js there. 
    -Create userSchema in this. Export User model from here.Documents of this scheme should be stored in user collection.
    -//user is the name of the collection in which the data is stored in the form of documents
        module.exports=mongoose.model("user",userSchema);
-Create another folder in backend-Routes and create CreateUser.js file inside this Routes folder.This file contains logic for /createuser and /loginuser endpoints.
    -Import router from express.Router()
    -2 router.post requests , each for create and login user.
    -Thunderbolt or postman api to check the requests.
    -import userschema from user.js file. 
    --npm install express-validator in command line  
    -const User = require("../models/User");
     const { body, validationResult } = require('express-validator');
    -Validations:
        -https://express-validator.github.io/docs/guides/getting-started/
        -use validations to check if email given is a proper email,or mentioning length of password and others.
        -const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });

            }
        -results.array() gives any validation violation errors.
    -createuser
        -Take the input given by user like name,email,password,location by accessing req.body.
        -create a json object and send that into our user collection of our database using user.Create({}) function.
    -loginuser
        -Take the input given by user like email,password by accessing req.body.
        -using user.findone({email}), find the document with given email. If email is found, check if the password matches
        -If password matches navigate to "/". For this, import useNavigate from react-router-dom.
-Password bycrpt and jsonwebtoken
    - npm i bcrypt jsonwebtoken
    -In CreateUser.js :
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        const jwtsecret ="<Your 32-bit secret>" //Any 32-bit string is fine
        -"/createuser" post request:
            -Generate Salt  using saltRounds(10), then hash the password using bcrypt.hash(). Save it in the database instead of plain text password.
        -"/loginuser" post request:
            -use bycrypt.compare() to compare  entered password with saved one. If it matches then generate authToken using jsonwebtoken and send it back.
            -Data is an object containing userData._id which is unique for every document.
            const data = {
                user: {
                    id: userData._id
                }
            }
            -Different authToken is generated everytime we try to login
            const authToken = jwt.sign(data, jwtsecret);

    


