const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
    {
        id: 'bjhbj1kn',
        name: 'ido',
        number: '0526460194'
    },
    {
        id: 'sdfsdf234',
        name: 'ifat',
        number: '0526837386'
    },
    {
        id: '2gg2jh3',
        name: 'itai',
        number: '0548932482'
    }
];

app.get('/b', (req, res) => {
    res.send(tasks);
});
app.get('/b/:id', (req, res) => {
    const id = req.params.id;

    for(let task of tasks) {
        if(task.id === id) {
            res.send(task)
            break;
        }
    }
});
app.post('/b', (req, res) => {
    tasks.push(req.body);
    res.send('ok');
});

app.put('/b', (req, res) => {
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === req.body.id) {
            tasks[i] = req.body;
            res.send(req.body);
        }
    }
});

app.delete('/b/:id', (req , res) => {
    const id = req.params.id;
    for(let task of tasks) {
        if(task.id === id) {
            index = tasks.indexOf(task);
            tasks.splice(index, 1);
            res.send("Delete");
            break;
        }
    }
});
app.listen(3000);
console.log('Listening to port 3000...');