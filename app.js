import express from "express"
import mongoose from "mongoose"
import jugando from "./api/models/jugando.js"

const app = express()
const port = 5500

const mongoURL = "mongodb+srv://usuario_be:1234@creandoback.mwxekie.mongodb.net/clientes?retryWrites=true&w=majority"

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})

/*metodos: app.use, app.post*/

app.use(express.json({lmit: "50mb"}))

app.post("/api/clients", (req, res) => {
    let clientData = req.body
    let mongoArray = []
    clientData.forEach(client => {
        mongoArray.push({
            firstName: client.firstName,
            phone: client.phone,
            address:client.address
        })
    })
    jugando.create(mongoArray, (err,records) =>{
        if (err) {
            res.status(500).send(err)
        }else {
            res.status(200).send(records)
        }
    })
    //res.send("You have posted something")
})

app.delete("/api/clients", (req, res)=>{
    jugando.deleteMany({}, (err) =>{
        res.status(500).send(err)
    })
})

/*home page donde sale la app*/
app.get("/api/clients", (req, res) => {
    jugando.find({}, (err, docs) =>{
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(docs)
        }
    })
})


/*port = puerto de salida, segundo parametro una callback funtion*/
app.listen(port, () => {
    console.log('Server is listening at http://localhost:' + port)
})
