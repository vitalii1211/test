import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"new_schema"
})

app.use(express.json())
app.use(cors())


app.get ("/", (req, res) => {
    res.json("Hello!")
})

app.get ("/todoData", (req, res) => {
    const q = "SELECT * FROM categories;"
    db.query (q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get ("/taskData", (req, res) => {
    const q = "SELECT * FROM tasks;"
    db.query (q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post ("/addTodoItem", (req, res) => {
    const values = [
        req.body.name
    ]
    const q = "INSERT INTO categories (name) VALUES (?)"

    db.query(q,[values],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно записаны!")
    })
})

app.post ("/addTaskItem", (req, res) => {
    const values = [
        req.body.categoryID,
        req.body.title,
        req.body.isDone,
        req.body.isDeleted,
        req.body.dateTime
    ]
    const q = "INSERT INTO tasks (categoryID, title, isDone, isDeleted, dateTime) VALUES (?)"

    db.query(q,[values],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно записаны!")
    })
})

app.delete ("/data/:id", (req, res) => {
    const categoryId = req.params.id;
    const q = "DELETE FROM categories WHERE id = ?"
    db.query(q,[categoryId],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно удалены!")
    })
});

app.listen(8800, () => {
    console.log('connection!')
});