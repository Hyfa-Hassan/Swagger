const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const fileUpload = require("express-fileupload")

const app = express();
const PORT = 4000;

app.use(fileUpload())
app.use(express.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

let userss = [
    {
        "id": 1,
        "name": "Tom Cruise"
    },
    {
        "id": 2,
        "name": "Clark"
    },
    {
        "id": 3,
        "name": "Brad Pitt"
    }
]

app.get("/string", (req, res) => {
    res.status(200).send("This is a string")
})
app.get("/user", (req, res) => {
    res.status(200).send({ id: 1, name: "Tom Cruise" })
})
app.get("/users", (req, res) => {
    res.status(200).send(userss)
})
app.get("/users/:id", (req, res) => {
    const obj = userss.find(x => x.id === parseInt(req.params.id))
    res.status(200).send(obj)
})

app.post("/create", (req, res) => {
    userss=[req.body,...userss]
    res.send(userss)
})

app.get("/usersQuery", (req, res) => {
    const obj = userss.find(x => x.id === parseInt(req.query.id))
    res.status(200).send(obj)
})
app.post("/upload", (req, res) => {
    const file = req.files.file
    let path = __dirname+"/upload/"+"file"+Date.now()+".jpg"
    file.mv(path,(err)=>{
        res.send("OK")
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})