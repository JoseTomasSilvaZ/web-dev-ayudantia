import express from "express"
import handlebars from "express-handlebars"
import championsRouter from "./routes/champions.routes.js"
import path from "path"

/* VARIABLES */
const PORT = 3000

/* SERVER INITIALIZATION AND CONFIG */
const app = express()
app.use(express.static(path.join(import.meta.dirname, "/public")))
app.use(express.json())
app.engine("handlebars", handlebars.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars")
app.set("views", "./views")


/* ROUTES */
app.use(championsRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`)
})