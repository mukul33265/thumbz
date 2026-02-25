const express = require("express");
const { registerUser, loginUser, verifyUser, logoutUser } = require("../controllers/authController");
const { protect } = require("../middleware.js/auth");
const authRouter = express.Router() ;

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);

authRouter.get('/verify',protect,verifyUser);
authRouter.post('/logout',protect,logoutUser)

module.exports = authRouter;