import express, {response} from "express"
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

    db.query(q,[values],(err, results) => {
        if(err) return res.json(err)
        return res.json(results.insertId)
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

    db.query(q,[values],(err,results) => {
        if(err) return res.json(err)
        return res.json(results.insertId)
    })
})

app.put ("/updateTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE tasks SET isDeleted = ?, isDone = ? WHERE id = ?"
    const values = [
        req.body.isDeleted,
        req.body.isDone
    ]

    db.query(q,[...values, id],(err, results) => {
        if(err) return res.json(err)
        return res.json(results.insertId)
    })
})

app.put ("/editTodoItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE categories SET name = ? WHERE id = ?"
    const values = [
        req.body.name
    ]

    db.query(q,[...values, id],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно записаны!")

    })
})

app.put ("/editTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE tasks SET title = ? WHERE id = ?"
    const values = [
        req.body.title
    ]

    db.query(q,[...values, id],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно записаны!")

    })
})

app.delete ("/updateTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM tasks WHERE id = ?"

    db.query(q,id,(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно записаны!")
    })
})

app.delete ("/deleteTodoItem/:id", (req, res) => {
    const categoryId = req.params.id;
    const q = "DELETE FROM categories WHERE id = ?"
    db.query(q,[categoryId],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно удалены!")
    })
});

app.delete ("/deleteTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM tasks WHERE id = ?"
    db.query(q,[id],(err) => {
        if(err) return res.json(err)
        return res.json("Данные успешно удалены!")
    })
});

app.listen(8800, () => {
    console.log('connection!')
});