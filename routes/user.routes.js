const passport = require('passport')
const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
//const upload = require('../middleware/upload')

router.get('/', passport.authenticate('jwt', {session:false}) ,userController.getUsers)
router.get('/:id', passport.authenticate('jwt', {session:false}) ,userController.getOneUser)
router.get('/student/:id', passport.authenticate('jwt', {session:false}) ,userController.getStudent)
router.get('/teacher/:id', passport.authenticate('jwt', {session:false}) ,userController.getTeacher)
router.put('/', passport.authenticate('jwt', {session:false}) ,userController.updateUser)
router.delete('/:id', passport.authenticate('jwt', {session:false}) ,userController.deleteUser)

module.exports = router