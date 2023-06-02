// import express from 'express' 
// ->ES Module
const express=require('express') //-> Common JS Module


const myMiddleWare=(req, res, next)=>{
    console.log(`${req.method}: ${req.originalUrl}`)
    req.isLogged=true
    next();
}
const app=express()

const crashHandler=(err,req, res, next)=>{
    if(err){
        console.error(err.stack)
    }
    res.send('Interal server error')
}

app
.use('/static',express.static('public'))

.get('/',(req,res)=>{
    res.send(`Home, Is logged in?- ${req.isLogged}`)
})
.use(crashHandler)

.get("/about",myMiddleWare,(req,res)=>{ 
    throw Error(`Not able to open ${req.originalUrl}`)

    res.send(`About, Is Logged in ?- ${req.isLogged}`)
})

.get("/card",(req,res)=>res.send(`Cards, Is logged?- ${req.isLogged}`))
app.listen(3000,()=>console.log('running on port http://localhost:3000/'))