const express = require('express');
const app = express();
const z = require("zod"); 
app.use(express.json());



 app.get('/', (req, res) => {
  res.send('Successful response.');
}); 


const hello = z.object({
  name: z.string(),
});


app.get("/hello", (req, res) => {
  const result = hello.safeParse(req.query);
  if (!result.success) {
    return res.json({ message: "invalid" });
  }
  const { name } = result.data;
  res.send(`Hello, ${name}!`);
});

// GET METHOD


app.get("/hello/:name", (req, res) => {
  const result = hello.safeParse({ name: req.params.name });
  if (!result.success) {
    return res.json({ message: "invalid" });
  }
  const { name } = result.data;
  res.send(`Hello, ${name}!`);
});


// PUT METHOD

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  res.send(req.params);
}); 
 

//POST METHOD

app.post('/create',(req,res)=>{
  const data=req.body;
  res.json({message:"data recived",data})
  
})

//OPTION METHOD

app.options("/", (req, res) => {
  res.set("Allow", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(204);
});

// DELETE METHOD

let users = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 }
];

app.delete('/users/:id', (req, res) => {

    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    const deletedUser = users.splice(userIndex, 1); // Remove user
    res.status(200).json({message: "User deleted successfully",user: deletedUser[0]});  // Return deleted user

});





app.listen(3000, () => console.log('Express server app is listening on port 3000.'));




