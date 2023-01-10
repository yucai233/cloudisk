import connect from 'connect'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'

async function sendMail(text, receive) {
    const user = "2845039413@qq.com"
    const pass = "wbsdotogcewvdhah" // wbsdotogcewvdhah
    const to = `${receive}`

    const transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false,
        auth: {
            user: user,
            pass: pass
        }
    })
    console.log("mail");

    const info = await transporter.sendMail({
        from: `Nodemailer<${user}>`,
        to: `Nodemailer<${to}>`,
        text: text
    }, (err, data) => {
        if(err) {
            console.log(err);
        }else {
            console.log(data);
        }
    })

    console.log('发送成功');
}

export default sendMail