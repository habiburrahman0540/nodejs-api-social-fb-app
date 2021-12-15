const UserController = require("../controllers/usersController")
const express = require("express");
const router = express.Router();

router.put("/:id",UserController.updateUser)
router.delete("/:id",UserController.deleteUser)
router.get('/:id',UserController.getUser)
router.put('/:id/follow',UserController.followUser)
router.put('/:id/unfollow',UserController.unfollowUser)
module.exports = router;