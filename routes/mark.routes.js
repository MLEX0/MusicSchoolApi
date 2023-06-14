const Router = require('express')
const passport = require('passport')
const router = new Router()
const markController = require('../controller/mark.controller')

router.get('/lesson/:id', passport.authenticate('jwt', {session:false}), markController.getMarkList)
router.get('/student/:id', passport.authenticate('jwt', {session:false}), markController.getStudentListByLessonID)
router.get('/studentall/:id', passport.authenticate('jwt', {session:false}), markController.getStudentAllMarkList)
router.post('/add/', passport.authenticate('jwt', {session:false}), markController.addMark)
router.post('/edit/', passport.authenticate('jwt', {session:false}), markController.editMark)

module.exports = router