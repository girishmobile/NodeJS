const express = require('express');
const router = express.Router();
const coursesAry = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
    {id:5, name:'course5'}
];

router.get('/', (req,res) =>{
    res.send(coursesAry );
});
//id is parameter
router.get('/:id',(req, res) =>{
    const course = coursesAry.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found.');
        return;
    } 
    res.send(course);
});
router.get('/:year/:month',(req, res) =>{
    res.send(req.query);
});
router.post('/', (req, res) =>{
   
    const schema1 = Joi.object({
        name:Joi.string().min(3).required()
    })
    const {error, value} = schema1.validate(req.body);
    if (error){
              res.status(400).send('Name is required and should be minimum 3 character');
              return;
      }
    const course = {
        id:coursesAry.length + 1,
        name:req.body.name
    }
    coursesAry.push(course);
    res.send(course);
});
router.put('/:id',(req,res)=>{
    //Look up the course
    //If not existing, return 404
    const course = coursesAry.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found.');
        return;
    } 
    //validate
    //If invalidate return 400 - Bad request
    const schema1 = Joi.object({
        name:Joi.string().min(3).required()
    })
    const {error, value} = schema1.validate(req.body);
    if (error){
              res.status(400).send('Name is required and should be minimum 3 character');
              return;
      }
    //Update course
    course.name = req.body.name;
    res.send(course);
    //Return the update courses 

});

router.delete('/:id',(req, res) =>{

    const course = coursesAry.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send('The course with the given ID was not found.');
    } 
    //Delete
    const index = coursesAry.indexOf(course);
    coursesAry.splice(index,1);
    res.send(course);
});
function validateCourse(course){
    console.log('validate',course);
    const schema = {
        name:Joi.string().min(3).require()
    };
    const result = Joi.valid(course,schema);
    return result;
}
module.exports = router;