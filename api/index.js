const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const User = require("./models/User")
const bcrypt = require("bcryptjs")

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

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
    }
    const userDoc = await User.create({
        name, 
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.status(201).json(userDoc)
})

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}!`)
})