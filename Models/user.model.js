const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{type:String, unique: true, require:true},
    password: String,
})

let saltRound = 10
userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, saltRound, (err, hash)=>{
        if (err) {
            console.log(err);
        } else{
            console.log(hash);
            this.password=hash
            next()
        }
    })
})

userSchema.methods.compareUser = async function(password){
    let checkpassword = await bcrypt.compare(password, this.password)
    if(checkpassword){
        return checkpassword
    }
    else{
        return false
    }
}


let userModel = mongoose.model("users", userSchema)

module.exports = userModel