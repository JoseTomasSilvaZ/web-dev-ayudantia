import express from "express"

/* VARIABLES */

const PORT = 3000
let cats = ["Matilda", "Matías", "Niñita"]

/* SERVER INITIALIZATION AND CONFIG */
const app = express()
app.use(express.json())

/* ROUTES */

app.get("/cats", (req, res)=>{
    res.status(200).json({cats})
})

app.get("/cat/:name", (req, res)=>{
    let {name} = req.params
    name = name.toLowerCase()
    const cat = cats.find(cat => cat.toLowerCase() === name)
    if(!cat) return res.status(404).json({message: "Cat not found"})
    res.status(200).json({cat})
})

app.post("/cat", (req, res)=>{
    const {name} = req.body
    if(!name) return res.status(400).json({message: "Name is required"})

    cats.push(name)
    res.status(201).json({message: "Cat added successfully", cats})
})

/* STATIC FILES */

app.use(express.static("views"))



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`)
})