/* THIS IS INBUILT AND WILL NOT BE USED ANYMORE
required to setup the server
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 202;
    res.end()
})

server.listen(3000, () => {console.log('seerver ready')}); */

//call express in
const express = require('express');
// create an app
const app = express()
// create a port
const port = 3000
// '/' is the designator for index page
app.get('/', (req, res) => {
    res.send("I am express")
})
// sets up a pafe called chickens
app.get('chickens', (req, res) => {
    res.send("I am a lot of chickens in a coat")
})
//allows you to receive paramaters and add to json, in this case a name
app.get('/chickens/:name', (req, res) => {
    res.send(req.params)
})
// make the app listen for the port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})