const { default: axios } = require('axios');
const express=require('express')
const app=express()

const {engine} = require("express-handlebars")
app.engine("handlebars",engine());

app.set("view engine","handlebars");

const fetchGithubActivity = async (username) =>{
    // github api gives the array of all the events that we have done --> after adding access token in github
    const url=`https://api.github.com/users/${username}/events/public`;
    const response = await axios.get(url);
    return response.data;
}
const githubUsername = 'kumsomi'
app.get('/',async (req,res)=>{
    const activities = await fetchGithubActivity(githubUsername);
    // res.setHeader("Content-type","text/html");
    // res.send(`<h1>Portfolio</h1><pre>${JSON.stringify(activity)}</pre>`)
    // console.log("activities[0]:",activities)
    res.render("home", {title:'kumsomi', activities:activities})
})

const port = process.env.port || 3000;
app.listen(port,()=>console.log(`server listening on port ${port}`))

