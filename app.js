const express=require('express')
const data= require('./db.json')
const app = express()

app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
app.get('/users', (req, res)=>{
res.json({ data })
})
app.get('/users/:id', (req, res)=>{
   const {id}= req.params
res.json({ data:data[+id - 1] })
})

app.post('/users', (req, res)=>{
    console.log(req.body)
    res.send("OK")
     data.push(req.body)
})

const PORT=5001
app.listen(PORT, ()=>{
    console.log(`Server OK ${PORT}`)
})

