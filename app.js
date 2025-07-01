// Importing required modules
const express = require('express');
const app = express();
const z = require("zod"); // For input validation

// Middleware to parse incoming JSON requests

app.use(express.json());


//                ---------------------- GET METHODS ---------------------- //



// Basic GET route to test server

app.get('/', (req, res) => {
  res.send('Successful response.');
});


// Zod schema to validate 'name' as a required string

const hello = z.object({
  name: z.string(),
});


// GET /hello?name=John
// Validates the 'name' from query parameters using Zod

app.get("/hello", (req, res) => {
  const result = hello.safeParse(req.query);
  if (!result.success) {
    return res.json({ message: "invalid" });
  }
  const { name } = result.data;
  res.send(`Hello, ${name}!`);
});


// GET /hello/John
// Validates the 'name' from route parameters using Zod

app.get("/hello/:name", (req, res) => {
  const result = hello.safeParse({ name: req.params.name });
  if (!result.success) {
    return res.json({ message: "invalid" });
  }
  const { name } = result.data;
  res.send(`Hello, ${name}!`);
});

 


app.listen(3000, () => console.log('Express server app is listening on port 3000.'));





//OPTIONAL QUERIES


/* // POST METHOD 

app.post('/create',(req,res)=>{
  const data=req.body;
  res.json({message:"data recived",data})

})

app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

app.get('/users/:userId/books/:bookId',(req,res)=>{
  res.send(req.params);
})


// PUT METHOD

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  res.send(req.params);
}); */




