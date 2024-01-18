require('dotenv').config()
// bringing in cors from outside library CORS SHOULD BE FIRST
const cors = require('cors')
//bringing in express from outside library
const express = require('express');
// create an app
const app = express()
// create a port
const port = process.env.PORT
//import the fruits API (REMEMBER THE PATH ./ SIGNIFIER)
const fruits = require("./fruits.json")
//import logger
const logger = require('./logger')

// our routes go here

//middleware goes first ALWAYS!
apps.use(cors())
app.use(express.json())
app.use(logger)


app.get("/", (req, res) => {
    res.send("Welcome to the fruit API!");
})

app.get("/fruits", (req, res) => {
    //return ALL fruits
    res.send(fruits)
})

app.get("/fruits/:name", (req, res) => {
    //return 1 fruit
    const name = req.params.name.toLowerCase();
    const ff = fruits.filter((f) => f.name.toLowerCase() == name)

    ff.length == 0 ? res.status(404).send('The fruit does not exist') : res.send(ff[0])
})

//create a new fruit in the API
app.post("/fruits", (req, res) => {

    if (!req.body || !req.body.name) {
        return res.status(400).send("Fruit name is required")
    }

    try {
        const fruit = fruits.find((f) => f.name.toLowerCase() === req.body.name.toLowerCase())
        if (fruit != undefined) {
            return res.status(409).send("That fruits exists")
        }

        const ids = fruits.map((f) => f.id)
        let maxId = Math.max(...ids)

        req.body.id = maxId + 1

        fruits.push(req.body)
        res.status(201).send("Fruit Created")
    }
    catch(e) {
        console.error(e)
        res.status(500).send("Shits gone wrong")
    }
})
//delete a fruit in the API
app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase()
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)
    if (fruitIndex == -1) {
        res.status(404).send("No fruit by that name found ")
    }
    else {
        fruits.splice(fruitIndex, 1)
        res.sendStatus(204)
    }
})
// update a fruit in the API
app.patch("/fruits/:name", (req, res) => {
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == req.params.name.toLowerCase())
    const newFruitName = req.body.name

    if (fruit == undefined) {
        res.status(404).send("No fruit by that name found")
    }
    else {
        fruit.name = newFruitName
        res.status(200).send(fruit)
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})