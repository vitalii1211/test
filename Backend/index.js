import express from "express"
import mysql from "mysql"
import cors from "cors"
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import session from 'express-session'

const app = express()

app.use(express.json())
app.use(cors ({
    origin: ("http://localhost:3000"),
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    key: "userid",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        express: 60 * 60 * 24,
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "new_schema"
})
const saltRounds = 10


app.post("/register", (req, res) => {
    const id = req.body.id
    const userFirstName = req.body.userFirstName
    const userLastName = req.body.userLastName
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
    bcrypt.hash(userPassword, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        const q = "INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)"
        db.query(q, [id, userFirstName, userLastName, userEmail, hash], (err) => {
            if (err) return res.json(err)
        })
    })
})

app.post("/login", (req, res) => {
    const email = req.body.userEmail
    const password = req.body.userPassword
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, email, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user)
                        res.send(result)
                    } else {
                        res.send({message: "Неверный е-мейл или пароль"})
                    }
                });
            } else {
                res.send({message: "Пользователь не найден"})
            }
        }
    })
})

app.get("/login", (req, res) => {
if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
} else {
    res.send({loggedIn: false})
}
})

app.get("/", (req, res) => {
    res.json("Hello!")
})

app.get("/todoData", (req, res) => {
    const q = "SELECT * FROM todo_list;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/taskData", (req, res) => {
    const q = "SELECT * FROM task_list;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/addTodoItem", (req, res) => {
    const values = [
        req.body.name
    ]
    const q = "INSERT INTO todo_list (name) VALUES (?)"

    db.query(q, [values], (err, results) => {
        if (err) return res.json(err)
        return res.json(results.insertId)
    })
})

app.post ("/addTaskItem", (req, res) => {
    const values = [
        req.body.todo_id,
        req.body.title,
        req.body.isDone,
        req.body.isDeleted,
        req.body.dateTime
    ]
    const q = "INSERT INTO task_list (todo_id, title, isDone, isDeleted, dateTime) VALUES (?)"

    db.query(q,[values],(err,results) => {
        if(err) return res.json(err)
        return res.json(results.insertId)
    })
})

app.put("/updateTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE task_list SET isDeleted = ?, isDone = ? WHERE id = ?"
    const values = [
        req.body.isDeleted,
        req.body.isDone
    ]

    db.query(q, [...values, id], (err, results) => {
        if (err) return res.json(err)
        return res.json(results.insertId)
    })
})

app.put("/editTodoItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE todo_list SET name = ? WHERE id = ?"
    const values = [
        req.body.name
    ]

    db.query(q, [...values, id], (err) => {
        if (err) return res.json(err)
        return res.json("Данные успешно записаны!")

    })
})

app.put("/editTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE task_list SET title = ? WHERE id = ?"
    const values = [
        req.body.title
    ]

    db.query(q, [...values, id], (err) => {
        if (err) return res.json(err)
        return res.json("Данные успешно записаны!")

    })
})

app.delete("/deleteTodoItem/:id", (req, res) => {
    const todo_id = req.params.id;
    const q = "DELETE FROM todo_list WHERE id = ?"
    db.query(q, [todo_id], (err) => {
        if (err) return res.json(err)
        return res.json("Данные успешно удалены!")
    })
});

app.delete("/deleteTaskItem/:id", (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM task_list WHERE id = ?"
    db.query(q, [id], (err) => {
        if (err) return res.json(err)
        return res.json("Данные успешно удалены!")
    })
});

app.listen(8800, () => {
    console.log('connection!')
});



// app.delete("/updateTaskItem/:id", (req, res) => {
//     const id = req.params.id;
//     const q = "DELETE FROM task_list WHERE id = ?"
//
//     db.query(q, id, (err) => {
//         if (err) return res.json(err)
//         return res.json("Данные успешно записаны!")
//     })
// })