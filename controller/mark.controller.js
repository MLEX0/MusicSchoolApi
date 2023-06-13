const db = require('../db')

class MarkController {
    async getMarkList(res, req){
        const id = res.params.id
        const marks = await db.query('SELECT * FROM \"StudentGrade\" \"SG\" LEFT JOIN \"Lesson\" \"L\" ON \"SG\".\"IDLesson\" = \"L\".\"ID\" '
        + 'LEFT JOIN \"Student\" \"ST\" ON \"SG\".\"IDStudent\" = \"ST\".\"ID\" WHERE \"L\".\"ID\" = $1;', [id])
        req.json(marks.rows)
    }
}

module.exports = new MarkController()