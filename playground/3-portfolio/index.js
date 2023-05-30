const { default: axios } = require('axios');
const express=require('express')
const app=express()

const fetchGithubActivity = async (username) =>{
    // github api gives all the array of events that we have done
    const url=`https://api.github.com/users/${username}/events/public`;
    const response = await axios.get(url);
    return response.data;
}
const githubUsername = 'kumsomi14'
app.get('/',async (req,res)=>{
    const activity = await fetchGithubActivity(githubUsername);
    res.json(activity);
})

const port = process.env.port || 3000;
app.listen(port,()=>console.log(`server listening on port ${port}`))

