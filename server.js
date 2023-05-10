import { app } from "./app.js";
import usersRouter from "./routes/users.js"
import todoRouter from "./routes/todo.js"
// var usersRouter = require('./routes/users');
// var todoRouter = require('./routes/todo');
app.get("/",(req, res)=>{
    res.send("<h1>Working fine</h1>")
})

app.get("/",(req, res, next)=>{
    res.status(200).json({
        users:[],
        sucess: false,
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Sever is working on port ${process.env.PORT}`);
})

app.use('/users', usersRouter);
app.use('/todo', todoRouter);