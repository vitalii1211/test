import express from "express"
import mysql from "mysql"
import cors from "cors"
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import session from 'express-session'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())
app.use(cors({
    origin: ("http://localhost:3000"),
    methods: ["GET", "POST", "PUT", "DELETE"],
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
        expires: 60 * 60 * 24,
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "new_schema"
})
const saltRounds = 10
// middleware
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("We need a token, please give it to us next time")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "You failed to authenticate"})
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.post("/register", (req, res) => {
    const id = req.body.id
    const userFirstName = req.body.userFirstName
    const userLastName = req.body.userLastName
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
// проверка, нет ли такого пользователя (е-мейл)
    const ifUserExist = "SELECT * FROM users WHERE email = ?"
    db.query(ifUserExist, userEmail, (err, result) => {
        if (result.length > 0) {
            res.json({message: "Такой пользователи уже зарегистрирован, войдите", result: result})
        } else {
// добавление нового пользователя в БД
            bcrypt.hash(userPassword, saltRounds, (err, hash) => {
                const q = "INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)"
                db.query(q, [id, userFirstName, userLastName, userEmail, hash], (err) => {
                    if (err) return res.json(err)
                    res.json({message: "Пользователь создан"})
                })
            })
            if (err) {
                console.log(err)
            }
        }
    })
})
app.post("/user", (req, res) => {
    const email = req.body.userEmail
    const password = req.body.userPassword
    // отправиляет е-мейл и пароль, получает в ответ ПОЛЬЗОВАТЕЛЯ
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, email, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id = result[0].id
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.user = result;
                        res.json({auth: true, token: token, result: result})
                    } else {
                        res.json({auth: false, message: "Неверный е-мейл или пароль"})
                    }
                });
            } else {
                res.json({auth: false, message: "Пользователь не найден"})
            }
        }
    })
})

app.get("/todo", verifyJWT, (req, res) => {
    const q = "SELECT * FROM todo_list;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.post("/todo", (req, res) => {
    const values = [
        req.body.name
    ]
    const q = "INSERT INTO todo_list (name) VALUES (?)"

    db.query(q, [values], (err, results) => {
        if (err) return res.json(err)
        return res.json(results.insertId)
    })
})
app.put("/todo/:id", (req, res) => {
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
app.delete("/todo/:id", (req, res) => {
    const todo_id = req.params.id;
    const q = "DELETE FROM todo_list WHERE id = ?"
    db.query(q, [todo_id], (err) => {
        if (err) return res.json(err)
        return res.json("Данные успешно удалены!")
    })
});

app.get("/task", (req, res) => {
    const q = "SELECT * FROM task_list;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.post("/task", (req, res) => {
    const values = [
        req.body.todo_id,
        req.body.title,
        req.body.isDone,
        req.body.isDeleted,
        req.body.dateTime
    ]
    const q = "INSERT INTO task_list (todo_id, title, isDone, isDeleted, dateTime) VALUES (?)"

    db.query(q, [values], (err, results) => {
        if (err) return res.json(err)
        return res.json(results.insertId)
    })
})
app.put("/task/:id", (req, res) => {
    const id = req.params.id;
    const q = "UPDATE task_list SET isDeleted = ?, isDone = ?, title = ? WHERE id = ?"
    const values = [
        req.body.isDeleted,
        req.body.isDone,
        req.body.title
    ]

    db.query(q, [...values, id], (err, results) => {
        if (err) return res.json(err)
        return res.json(results.insertId)
    })
})
app.delete("/task/:id", (req, res) => {
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

export default db;