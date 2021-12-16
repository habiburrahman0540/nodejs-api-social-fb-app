
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController")

router.post("/",postController.createPost);
router.put("/:id",postController.updatePost);
router.delete("/:id",postController.deletePost);
router.put("/:id/like",postController.likedPost);
router.get("/:id",postController.getPost);
router.get('/timeline/all',postController.timelinePost)
module.exports = router;