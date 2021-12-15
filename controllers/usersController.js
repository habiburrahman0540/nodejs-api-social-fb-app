const bcrypt = require("bcrypt")
const User = require("../models/users")

// update user
exports.updateUser = async (req,res)=>{
    
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }catch(error){
                res.status(500).json(error);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("Account has been updated.")
        }catch(error){
            res.status(500).json(error);
        }
    }else{
        return res.status(403).json("You can update only your account.")
    }

}
                    //Delete user
exports.deleteUser = async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin ){
            try{
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account deleted successfully.");
            }
            catch(error){
                res.status(500).json(error);
            }
    }else{
        return res.status(403).json({Error:"You can not delete this account."})
    }
}
                //get user
exports.getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password,isAdmin, updatedAt , ...other} = user._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error);
    }
}
//followings and follower 

exports.followUser = async(req,res)=>{
        if(req.body.userId !== req.params.id){
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId)
                if(!user.followers.includes(req.body.userId)){
                    await user.updateOne({$push:{followers:req.body.userId}})
                    await currentUser.updateOne({$push:{followings:req.params.id}})
                    res.status(200).json("User has been followed.")
            }else{
                res.status(403).json("You already follow this user."); 
            }
        } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            return res.status(403).json("You can not follow yourself.")
        }
}
//unfollowings and unfollow

exports.unfollowUser = async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("User has been unfollowed.")
        }else{
            res.status(403).json("You already unfollow this user."); 
        }
    } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        return res.status(403).json("You can not unfollow yourself.")
    }
}