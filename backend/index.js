const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

app.get('/b', (req, res) => {
    const binsFolder = './backend/general_collections_bin/ido_bin';
    fs.readdir(binsFolder, (err, files) => {
        console.log(files)
        const filesArr = [];
        files.forEach(file => {
            console.log(file)
            const data = fs.readFileSync(`./backend/general_collections_bin/ido_bin/${file}`, {encoding:'utf8', flag:'r'})
            filesArr.push(JSON.parse(data));
        })
        console.log(filesArr)
        res.status(200).send(filesArr)
    });
});
app.get('/b/:id', (req, res) => {
    const id = req.params.id;
    const data = fs.readFileSync(`backend/general_collections_bin/ido_bin/${id}.json`,
            {encoding:'utf8', flag:'r'});
    res.send(data);
});
app.post('/b/:id', (req, res) => {
    const tasksJson = JSON.stringify(req.body, null, 6);
    const id = req.params.id;
    fs.writeFile(`backend/general_collections_bin/ido_bin/${id}.json`, `${tasksJson}`, (err) => {
        if (err) return console.log(err);
        res.status(500);
        console.log('Hello World > helloworld.json');
    });
    res.status(201).send("added");
});
app.put('/b/:id', (req, res) => {
    const id = req.params.id;
    const { body } = req;
    try {
      fs.writeFileSync(
        `backend/general_collections_bin/ido_bin/${id}.json`,
        JSON.stringify(body, null, 6)
      );
      res.json(body);
    } catch (e) {
      res.status(500).json({ message: "Error!", error: e });
    }
});
app.delete('/b/:id', (req , res) => {
    const id = req.params.id;
    const path = `backend/general_collections_bin/ido_bin/${id}.json`;
    try {
        if(id) {
        fs.unlinkSync(path)
        res.send(`The file "${id}.json" has been deleted`)
        } else {
            res.status(404).send('File is undefined')
        }
    } catch(err) {
        console.log(err)
    }
});

app.listen(3000, () => console.log('Listening to port 3000...'));