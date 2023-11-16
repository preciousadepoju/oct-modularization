const userModel = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const SECRET = 'process.env.SECRET'

const userWelcome = (req, res) => {
    res.send(" Welcome to the user Route")
    console.log("Welcome to the user route");
}

const userSignin = (req, res)=>{
    res.send("user sign in page")
}

const userDashboard = (req, res) =>{
    res.send("user dashboard")
}

const registerUser = (req, res) => {

    console.log(req.body);
    let user = new userModel(req.body)
    user.save().then(()=>{
        console.log("user saved");
       
        res.send({status:true, message: "user saved successfully"})
    }).catch((err) =>{
        console.log("error creating user:", err);
        res.send({errstatus:false, message: "user not saved "})
    })
}

const authenticateUser = (req, res)=>{
    let {email, password} = req.body
    userModel.findOne({email: email})
    .then( async (user)=>{
        try{
           let checkUser = await user.compareUser(password)
           if (checkUser) {
            console.log(user);
            let token = jwt.sign({email}, SECRET, {expiresIn: "4h"})
            res.send({status:true, message:"user found"})
         } else{
             console.log(user);
             res.send({status:false, message:"user not found"})
         }
            
        }catch{

        }
    }).catch((err)=>{
        console.log("error", err);
    })
}

const dashboard = (req, res) =>{
    let token = req.body.authorisation.split(" ")[1]
    jwt.verify(token, SECRET, ((err, result)=>{
        if (err) {
            res.send({status:false, message:"wrong"})
        } else{
            res.send({status:true, message:"right"})

        }
    }))
}
module.exports = {userWelcome, registerUser,userSignin, userDashboard, authenticateUser, dashboard}