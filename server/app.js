const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static('client'));

//! GET 
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(request.err));
})
//! Create/post
app.post('/insert', (request, response) =>{
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName();

    result
    .then(data => response.json({ data : data }))
    .catch(err => console.log(err));
});

//! Delete
app.delete('/delete/:id', (request, response) => {
    const {id} = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);

    result
    .then(data => response.json({ success : data }))
    .catch(err => console.log(err));
});

//! Update
app.patch('/update', (request, response) =>{
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(id, name);

    result
    .then(data => response.json({success :data}))
    .catch(err => console.log(err));
});

//! Search
app.get('/search/:name', (request, response) =>{
    const { id, name } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.searchByName(name);

    result
    .then(data => response.json({data :data}))
    .catch(err => console.log(err));
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/client/index.html');
});

app.listen(process.env.PORT, () => console.log('app is runing BROO!!!!'));