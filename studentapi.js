const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let students=[{
    "studname": "laksh",
    "studid": "111",
    "Grade":"A",
    "course":"Cse",
    "studaddress": "chennai",
    "studphno":7339038061
},
{
    "studname": "chan",
    "studid": "222",
    "Grade":"B",
    "course":"Cse",
    "studaddress": "trichy",
    "studphno":7339038768
},
{
    "studname": "lava",
    "studid": "333",
    "Grade":"C",
    "course":"Cse",
    "studaddress": "Coimbatore",
    "studphno":7339038786
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/student', (req, res) =>{
    res.json(students);
});

app.get('/student/:studid',(req, res)=>{
    const studid = req.params.studid;

    for(let student of students){
        if(student.studid === studid){
            res.json(students);
            return;
        }
    }

    res.status(404).send('Student not found');
});

app.post('/student', (req, res) => {
    const student= req.body;

    console.log(student);
    students.push(student);

    res.send('Student is added to the database');
});

app.put('/student/:studid',(req, res)=>{
    const studid = req.params.studid;
    const newstudent= req.body;
    
    for(let i=0;i<students.length;i++){
        let student=students[i]

        if(student.studid === studid){
            students[i]=newstudent;
        }
    }

    res.send('Student is edited');

});

app.delete('/student/:studid', (req, res)=>{
    const studid = req.params.studid;

    students=students.filter(i => {
        if(i.studid !== studid){
            return true;
        }
        return false;
    });
    res.send('Student is deleted');
});

app.listen(port,()=>
console.log(`Hello world listening on port ${port}!`
));
