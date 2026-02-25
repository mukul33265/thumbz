const bcrypt = require("bcrypt");
const User = require('../models/User');

// controller for user registration 
const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body ;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : 'User already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password : hashedPassword});
        await newUser.save() ;
        // setting user data in the session 
        req.session.isLoggedIn = true ;
        req.session.userId = newUser._id;
        return res.json({
            message : 'Account created successfully',
            user : {
                _id : newUser._id,
                name : newUser.name ,
                email : newUser.email ,
            }
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            message : error.message 
        })
    }
}

// controller for user login 
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            // status 400 is the bad request mean the client send the incorrect or the invalid data 
            return res.status(400).json({message : 'Invalid Email ID'});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : 'Invalid Password'});
        }

        req.session.isLoggedIn = true ;
        req.session.userId = user._id ;

        return res.json({
            message : 'Login Successfull',
            user : {
                _id : user._id,
                name : user.name ,
                email : user.email 
            }
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            message : error.message 
        })
    }
}

// controller for user logout 
const logoutUser = async(req,res) => { 
    req.session.destroy((error) => {
        if(error){
            console.log(error);
            return res.status(500).json({message : error.message})
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({
                message : 'Logout Successfully'
        })
    })
}

// controller for user verify 
const verifyUser = async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await User.findById(req.session.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "Invalid User" });
        }

        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { registerUser,loginUser,logoutUser,verifyUser };