const db = require('../db')

class ScheduleController {
    async getTeacherSchedule(res, req){
        const id = res.params.id
        const schedule = await db.query('SELECT * FROM \"FUNC_TeacherScheduleById\"($1) ORDER BY \"WeekDayNumber\", \"StartTime\"', [id])
        req.json(schedule.rows)
    }
    async getGroupScheduleByName(res, req){
        const name = res.params.name
        const schedule = await db.query('SELECT * FROM \"FUNC_GroupSchedule\"($1) ORDER BY \"WeekDayNumber\", \"StartTime\"', [name])
        req.json(schedule.rows)
    }
}

module.exports = new ScheduleController()