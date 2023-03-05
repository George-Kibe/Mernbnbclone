const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const User = require("./models/User")
const bcrypt = require("bcryptjs")

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ugbnuwnfuwi7371gyrjfkwg20';

const PORT = 5000
app.use(cors());
app.use(express.json())
app.get("/", (req,res) => {
    res.json(`Server running on port ${PORT}. Working Fine!`)
})

mongoose.connect(process.env.MONGO_URL)

app.post("/users/register", async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email ||!password){
        res.status(400).json("Invalid Request")
        return
    }
    try {
        const userDoc = await User.create({
            name, 
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.status(201).json(userDoc)
    } catch (error) {
        res.status(422).json(error)
        return
    }
})

app.post('/users/login', async(req,res) => {
    const {email, password} = req.body;
    const userDoc  = await User.findOne({email});
    if (userDoc){
        const passwordOk = bcrypt.compareSync(password, userDoc.password);
        if (passwordOk){
            const time = new Date();
            const token = jwt.sign({email:userDoc.email, id:userDoc._id, time}, jwtSecret, {});            
            console.log(time);
            if (token){
                res.cookie('token', token).status(202).json(token);
                return
            } else {
                res.status(422).json("Token Genrating Error! Try Again!");
                return
            }
            
        } else {
            res.status(422).json("Invalid email or Password");
            return
        }
        res.status(202).json("User Found!")
    }else{
        res.status(404).json("Not Found!")
    }
})



app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}!`)
})