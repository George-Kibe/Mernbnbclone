const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const dotenv = require("dotenv")
const imageDownloader = require("image-downloader")
const multer = require('multer')
dotenv.config()
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const fs = require("fs")

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ugbnuwnfuwi7371gyrjfkwg20';

const PORT = 5000
app.use(cors());
app.use(express.json())
app.use(cookieparser());
app.use("/uploads", express.static(__dirname + "/uploads"));


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
            const token = jwt.sign({name:userDoc.name, email:userDoc.email, id:userDoc._id, time}, jwtSecret, {});            
            console.log(time);
            if (token){
                res.cookie('token', token).status(202).json({userDoc,token});
                return
            } else {
                res.status(422).json("Token Genrating Error! Try Again!");
                return
            }
            
        } else {
            res.status(422).json("Invalid email or Password");
            return
        }
    }else{
        res.status(404).json("Not Found!")
    }
})

app.get("/users/profile", async(req, res) => {
    const token = req.cookies;

    res.json(token)
})


app.use("/upload-by-link", async(req, res) => {
    const {link} = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    try {
        const response = await imageDownloader.image({
            url: link,
            dest: __dirname + "/uploads/" + newName
        })
        //reponds with filename
        //console.log(response)
        res.status(201).json(newName)
    } catch (error) {
        res.status(422).json(error);
        return
    }
})

const photosMiddleware = multer({dest:"uploads"})
app.use("/upload", photosMiddleware.array("photos", 100), async(req,res) => {
    try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            console.log(req.files[i])
            const {path, originalname} = req.files[i];
            console.log(path, originalname);
            const parts = originalname.split(".");
            const ext = parts[parts.length-1];
            const newPath = path +"." + ext;
            //rename
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace("uploads/", ""));
        }
        res.status(201).json(uploadedFiles)
    } catch (error) {
        res.status(422).json("Unprocessable Entry!");
        return
    }
})



app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}!`)
})