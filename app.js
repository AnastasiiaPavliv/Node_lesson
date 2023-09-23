const express=require('express')
const fsService= require('./fs.service')

const app = express()

app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
app.get('/users',async (req, res)=>{
    const users = await fsService.reader()
    res.json(users)
    console.log(users)
})

app.post('/users',async (req, res)=>{
   const {name, email} = req.body;
   try {
       if (!name || name.length < 2) {
          throw new Error("wrong name!")
       }
       if (!email || !email.includes('@')) {
           throw new Error('Wrong email!')
       }
       const users = await fsService.reader()
       const newUser = {name, email, id: users[users.length - 1].id}
       users.push(newUser)
       await fsService.writer(users)
       res.status(201).json(newUser)
   }catch (e) {
       res.status(400).json(e.message)
   }
})
app.get('/users/:id',async (req, res)=>{
    const {id}= req.params
    const users = await fsService.reader()
    const user=users.find((user)=>user.id===Number(id))
    res.json(user)
})
app.delete('/users/:id', async (req, res)=>{
    const {id} =req.params
    const users=await fsService.reader()
    users.splice(+id - 1,1)

    await fsService.writer(users)

    res.sendStatus(204)
})

const PORT=5001
app.listen(PORT, ()=>{
    console.log(`Server OK ${PORT}`)
})

