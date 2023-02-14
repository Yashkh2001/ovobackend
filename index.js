const nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')
const express = require('express');
const app=express()
const cors = require("cors");
app.use(express.json())

app.use(cors());



app.post("/confirmation", (req, res) => {
const id=req.body.id
const email=req.body.email
const user={id:id}
const token=jwt.sign({user},'my-secret-key')

console.log(token,'token')


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kakapaka92@gmail.com',
        pass: 'bfytgekqccghispi'
    }
});

const url=`http://localhost:3000/confirmation`
let mailDetails = {
    from: 'kakapaka92@gmail.com',
    to: `${email}`,
    subject: 'Test mail',
    html: `<p style="text-align: center;">Hello Welcome to Ovo Please Click here to verify your account</p>
    <p style="text-align: center;">&nbsp;</p>
    <p style="text-align: center;">&nbsp;</p>
    <p style="text-align: center;">
    <span style="color: rgb(255, 255, 255);">
    <a href="${url}">
    <button style="background-color: #10f442 !important; opacity: 0.95; font-size: 14px; width: 100px; height: '40px  color: #ffffff !important;"> Verify </button></span></p> </a>`
};

mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('Email sent successfully');
        const obj={
            name:req.body.name,
            email:req.body.email
        }
        res.send(obj)
    }
});

})




// const token=jwt.sign()
// console.log(token)



const PORT=3001

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})


