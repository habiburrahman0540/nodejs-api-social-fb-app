const User = require("../models/users");
const bcrypt = require('bcrypt');
exports.register = async (req,res)=>{
    try {
const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const emailCheck = await User.findOne({email:req.body.email})
        emailCheck && res.status(404).json("Email already exist.")
        const usernameCheck = await User.findOne({username:req.body.username})
        usernameCheck && res.status(404).json("Username already exist.")
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
    
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.login = async (req,res) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("Email not found.");
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("Invalid password.");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
        

}