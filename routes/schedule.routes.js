const Router = require('express')
const passport = require('passport')
const router = new Router()
const scheduleController = require('../controller/schedule.controller')

router.get('/teacher/:id', passport.authenticate('jwt', {session:false}), scheduleController.getTeacherSchedule)
router.get('/group/:name', passport.authenticate('jwt', {session:false}), scheduleController.getGroupScheduleByName)

module.exports = router