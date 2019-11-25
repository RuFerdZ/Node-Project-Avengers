const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

let avengerList = [
    { id:1, name:"Bedsheet Man", power:"Sleep"},
    { id:2, name:"Jangi hora", power:"Steal underwears"},
    { id:3, name:"Wambotta", power:"Stealth Murderer"},
    { id:4, name:"Pathola Buriya", power:"Gay Rapist"}
]

app.get('/avengers',(req,res)=>{
    res.send(avengerList)
})

app.post('/avengers',(req,res)=>{
    let newAvenger = {
        id:avengerList.length + 1,
        name: req.body.name,
        power: req.body.power
    }

    avengerList.push(newAvenger)
    res.send(avengerList)
})

app.put('/avengers/:avengerID',(req,res)=>{
    let avenger = avengerList.find( b => b.id === parseInt(req.params.avengerID))

    if(!avenger){
        return res.status(404).send("The given id doesnt exist")
    }

    if (!req.body.name){
        return res.status(400).send("Not all mandatory values are sent")
    }

    avenger.name = req.body.name
    return res.send(avenger)
})

app.delete('/avengers/:avengerID',(req,res)=>{
    let avenger = avengerList.find( b => b.id === parseInt(req.params.avengerID))

    if(!avenger){
        return res.status(404).send("The given id doesnt exist")
    } 

    let indexOfAvenger = avengerList.indexOf(avenger)
    avengerList.splice(indexOfAvenger,1)
    return res.send(avengerList)
})

app.listen(PORT,()=>{
    console.log("Server listening in port : " + PORT)
})