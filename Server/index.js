
import http from 'http'
import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url)
const db = client.db();
const connection = db.collection('cloudpan')

var userName = "";
var currentPath = "D:/codelife/frontEnd/CloudPan/Server/disk/";


const app = express()

app.use(bodyParser.json())

app.get('/dir', (req, res) => {
    userName = req.query.user
    currentPath += userName
    fs.readdir(currentPath, (err, files) => {
        res.send(JSON.stringify(files))
    })
})

app.post('/loginUp', (req, res) => {
    console.log(req.body);
    let data = req.body;
    // TODO search infomation in mongodb, return the result of login
})

app.post('/regist', (req, res) => {
    let data = req.body;
    connection.insertOne(data, (err, result) => {
        
    })
})

app.get('/createFolder', (req, res) => {
    let folder = req.query.folderName;
    // TODO create new folder
})

app.get('/openFile', (req, res) => {
    let folder = req.query.folderName;
    fs.readdir(currentPath + folder, (err, files) => {
        res.send(JSON.stringify(files))
    })
    // TODO dealing empty folder 
})

const server = app.listen(80, () => {
    console.log('process listening');
    
})
