const db = require('../db')

class MarkController {
    async getMarkList(res, req){
        const id = res.params.id
        const marks = await db.query('SELECT * FROM "FUNC_MarkListByID"($1);', [id])
        req.json(marks.rows)
    }
    async getStudentAllMarkList(res, req){
        const id = res.params.id
        const marks = await db.query('SELECT * FROM \"FUNC_AllStudentGrades\"($1) ORDER BY \"LessonDate\" DESC;', [id])
        req.json(marks.rows)
    }
    async getStudentListByLessonID(res, req){
        const id = res.params.id
        const students = await db.query('SELECT * FROM \"Student\" WHERE \"IDStudyGroup\" = ' + 
        '(SELECT \"IDStudyGroup\" FROM \"Lesson\" WHERE \"ID\" = $1);', [id])
        req.json(students.rows)
    }
    async addMark(req, res){
        const {IDStudent, IDGrade, IDLesson} = req.body
        const user = await db.query('INSERT INTO public.\"StudentGrade\"(\"IDStudent\", \"IDGrade\", \"IDLesson\") VALUES ($1, $2, $3) RETURNING *', [IDStudent, IDGrade, IDLesson])
        res.json(user.rows[0])
    }
    async editMark(req, res){
        const {ID, IDStudent, IDGrade, IDLesson} = req.body
        const user = await db.query('UPDATE public.\"StudentGrade\" SET \"IDStudent\"=$1, \"IDGrade\"=$2, \"IDLesson\"=$3 WHERE \"ID\" = $4 RETURNING *', [IDStudent, IDGrade, IDLesson, ID])
        res.json(user.rows[0])
    }
}

module.exports = new MarkController()

//SELECT * FROM "Student" WHERE "IDStudyGroup" = (SELECT "IDStudyGroup" FROM "Lesson" WHERE "ID" = 7)
//INSERT INTO public."StudentGrade"("IDStudent", "IDGrade", "IDLesson") VALUES ($1, $2, $3);
