const Router = require('express')
const passport = require('passport')
const router = new Router()
const markController = require('../controller/mark.controller')

router.get('/lesson/:id', passport.authenticate('jwt', {session:false}), markController.getMarkList)


module.exports = router