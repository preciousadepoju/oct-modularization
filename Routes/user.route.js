const express = require("express")
const router = express.Router()
const {userWelcome,userSignin, dashboard, registerUser,userDashboard, authenticateUser} = require("../Controllers/user.controller")

router.get("/welcome", userWelcome)
// router.post("/signin", userSignin)
// router.get("/dashboard", userDashboard)
// router.get("/dashboard", userDashboard)
router.get("/dashboard", dashboard)



router.post("/register", registerUser)
router.post("/signin", authenticateUser)



module.exports = router