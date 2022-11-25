import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import DbClient from 'ali-mysql-client'

import cors from 'cors'
import sendMail from './mail.js'
import { Worker } from 'worker_threads'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multiparty from 'multiparty'
import path from 'path'
import Busboy from 'busboy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__dirname);

const RESPONSE = {
    ERROR: '0',
    SUCCESS: '1'
}

// connecting to mysql
const db = new DbClient({
    host: 'localhost',
    user: 'root',
    password: '20030606',
    database: 'cloudisk'
})


// store path
var userName = "";
var staticPath = "D:/codelife/frontEnd/CloudPan/Server/disk/";
var currentPath = staticPath;
var correctVerify = ""

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, currentPath)
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const storePath = multer({storage: storage})


// router
const app = express()

app.use(bodyParser.json())
app.use(cors())

// app.get('/dir', (req, res) => {
//     userName = req.query.user
//     currentPath += userName
//     fs.readdir(currentPath, (err, files) => {
//         res.send(JSON.stringify(files))
//     })
// })

app.post('/loginUp', async (req, res) => {
    console.log(req.body);
    let data = req.body;
    userName = req.body.name
    currentPath = staticPath + userName
    // TODO search infomation in mysql, return the result of login
    const result = await db
        .select('*')
        .from('user_info')
        .where('name', data.name)
        .where('password', data.password)
        .queryRow();

    console.log(result);
    if(result === undefined) {
        res.end(RESPONSE.ERROR)
    }else {
        res.end(RESPONSE.SUCCESS)
    }
})

app.post('/regist', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    const verify = req.body.verify
    if(verify != correctVerify) 
        res.end(RESPONSE.ERROR)
    const result = await db
        .select('*')
        .from('user_info')
        .where('name', data.name)
        .queryRow();

    if(result !== undefined) res.end(RESPONSE.ERROR)

    await db
        .insert("user_info", data)
        .execute();
    res.end(RESPONSE.SUCCESS)
})

app.post('/sendMail', async (req, res) => {
    const data = req.body;
    const mail = data.mail
    const obj = {
        code: Math.ceil(Math.random()*100000)
    }
    const text = `验证码：${obj.code}\n
    十分钟后失效，请勿泄露`
    correctVerify = String(obj.code)
    setTimeout(() => {
        correctVerify = ''
    }, 600000)
    sendMail(text, mail)
    res.end(RESPONSE.SUCCESS)
})

app.get('/createFolder', (req, res) => {
    let folder = req.query.folderName;
    const path = req.query.path
    console.log(path);
    fs.mkdirSync(currentPath + path + '/' + folder)
    fs.readdir(currentPath + path, (err, files) => {
        res.send(JSON.stringify(files))
    })
})

app.get('/openFile', (req, res) => {
    let folder = ''
    if(req.query.folderName) folder = req.query.folderName
    fs.readdir(currentPath + folder, (err, files) => {
        res.send(JSON.stringify(files))
    })
})

app.post('/uploudFile', (req, res) => {

    const busboy = Busboy({headers: req.headers})
    const pth = req.query.path
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log(filename)
      
        const storePath = path.join(__dirname, 'disk', pth, filename.filename)
        file.pipe(fs.createWriteStream(storePath))
        
      })
      
      // 监听请求中的字段
      busboy.on('field', function(fieldname) {
        console.log(`Field [${fieldname}]`)
      })
      
      // 监听结束事件
      busboy.on('finish', function() {
        console.log('Done parsing form!')
        res.end('200')
      })

      req.pipe(busboy)
})

app.get('/downloadFile', (req, res) => {
    // TODO send file to client
    let fileName = req.query.fileName

    // const rs = fs.createReadStream(currentPath + fileName)
    // rs.on('data', (chunk) => {
    //     res.download(chunk)
    // })
    res.download(currentPath + fileName)
})

app.get('/reset', (req, res) => {
    currentPath = staticPath
    console.log(currentPath);
    res.end(RESPONSE.SUCCESS)
})


// startup the server
const server = app.listen(80, () => {
    console.log('process listening');
})
