import express from "express";
import userController from "../constroller/userController.js";



const router = express.Router();

router
    .route('/')
    .get(userController.getUsers)
    .post(userController.createUser)
router
    .route('/create')
    .post(userController.createOneUser)


router
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser)

export default router