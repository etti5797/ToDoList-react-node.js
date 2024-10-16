import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is a server for a toDoList app!');
}, []);

let toDoList = [];

app.get('/getToDoList', (req, res) => {
  res.send(toDoList);
});

app.post('/addTask', (req, res) => {
  const task = req.body.task;
  if (task != "")
  {
    toDoList.push(task);
    // status code: 201 means created, 400 means bad request
    res.status(201).send({ success: true, toDoList }); // Send updated list after adding task
  } else {
    res.status(400).send({ success: false, message: 'Task cannot be empty' });
  }
});

app.delete('/deleteTask', (req, res) => {
  const task_index = req.body.task_index;
  toDoList = toDoList.filter((t, idx) => idx !== task_index);
  res.status(200).send({ success: true, toDoList }); // 200 means OK
});


app.listen(5000, () => {console.log('Server is running on port 5000')});
