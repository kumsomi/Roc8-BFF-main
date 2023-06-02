const express=require('express')
const app=express()
const urlsData = require('./urls.json')

const bodyParser=require('body-parser')
const shortid = require('shortid')
const fs=require('fs')

app
    .use(bodyParser.json())
    .get("/:shortUrl",(req,res)=>{
        const {shortUrl}=req.params
        const foundUrl=urlsData.find((item)=>item.short_url===shortUrl)
        if(foundUrl){
            res.redirect(foundUrl.original_url)
        }
        else{
            res.send('cannot get the URL')
        }
        
    })
    .post('/shorten',(req,res)=>{
        const {url:originalUrl}=req.body
        const foundUrl=urlsData.find((item)=>item.original_url===originalUrl)
        if(foundUrl){
            res.send(foundUrl)
        }
        else{
            // create a new record pattern
            const shortUrl=shortid.generate()

            // Create new url object
            const newUrl={
                original_url:originalUrl,
                short_url:shortUrl
            };
            //Add the new url to the array
            urlsData.push(newUrl)

            // write the new array to the file
            fs.writeFileSync('./urls.json',JSON.stringify(urlsData))

            // send the data back to the server
            res.send(newUrl)
        }
        // res.send('Hi Post')
    })
    .listen(3000,()=>console.log('server on port:3000'))