const Post = require("../models/post");
const User = require("../models/users");

// create a post
exports.createPost = async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json("Post created successfully.")
    }
    catch(error){
        res.status(500).json(error)
    }
}
// update a posts
exports.updatePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
       
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("post updated successfully.")
        }else{
            res.status(403).json("You can update only your post")
        }
    }catch(error){
        res.status(500).json(error)
    }
}
//Delete a post
exports.deletePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
       
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post deleted successfully.")
        }else{
            res.status(403).json("You can delete only your post")
        }
    }catch(error){
        res.status(500).json(error)
    }
}
// like a post
exports.likedPost = async(req,res)=>{
        try {
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push:{likes:req.body.userId}});
                res.status(200).json("The post has been liked.")
            }else{
                await post.updateOne({$pull:{likes: req.body.userId}});
                res.status(200).json("The post has ben disliked.");
            }
        } catch (error) {
            res.status(500).json(error)
        }
}

//get a post
exports.getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
}
//get timeline post
exports.timelinePost = async(req,res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({userId: currentUser._id});
       
        const friendPost = await Promise.all(currentUser.followings.map((friendid)=>{
           return Post.find({userId: friendid});
        }));
        res.json(userPost.concat(...friendPost));
    }catch(err){
        res.status(500).json(err)
    }
}
//get all posts