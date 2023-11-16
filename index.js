const express = require('express')
const app = express()
const env = require('dotenv').config()
const PORT = process.env.PORT;
const URI = process.env.URI
const cors = require('cors')
const userRoute = require("./Routes/user.route");
const  mongoose  = require('mongoose');


mongoose.connect(URI)
.then(()=>{
    console.log('Database connected successfully');
}) 
.catch((err)=>{
    console.log(Error);
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/user", userRoute)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})