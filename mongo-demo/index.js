
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connected mongoDB...',err))

const courseSchema = new mongoose.Schema({
    name: {
            type:String, 
            required:true,
            minlength:5,
            maxlength:255,
        },
    category:{
        type:String,
        required:true,
        enum:['web','mobile','network','Database','SAP'],
        lowercase:true,
        trim:true,

    },
    author: String,
    tags: {

        type:Array,
            validate:{
                validator: function (v){
                    return v && v.length > 0;
                },
                message: 'A course should have at least one tag'
        }
    },
    date:{type: Date, default:Date.now},
    isPublished:Boolean,
    price:{
        type:Number,
        required: function(){ return this.isPublished;},
        min:10,
        max:200
    }


});
const Course = mongoose.model('Course',courseSchema)
async function createCourse(){
    const course = new Course({
        name:'Objective C',
        category:'Web   ',
        author:"Brown",
        tags:['Design'],
        isPublished:true,
        price:21
    });
    try {
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
}
createCourse();
async function getCourses(){
     const courses = await Course
        .find({isPublished:true, tags:{$in: ['frontend','backend']}})
        .limit(10)
        .sort({price:-1}) // 1 as assending order and -1 as dessending order
        .select({name:1, tags:1, price:1})
     console.log(courses);
}
//1 Approach 
async function updateCourse(id){
    const course = await Course.findById(id)
    if(!course) return;

    course.isPublished = true;
    course.author = "Another Author";

    course.set({
        isPublished: true,
        author:'Another Author'
    });
    const result = await course.save();
    console.log(result);


}
//2 Approach 
async function updateCourseApproach2(id){
    // const result = await Course.updateOne({_id: id},{
    //     $set:{
    //         isPublished:true,
    //         author:'Mosh'
    //     }
    // })
    // console.log(result);
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Jason',
            isPublished:true
        }
    },{new:true});
    console.log(course);
}
async function removeCourse(id){
    
    //const result = await Course.deleteOne({_id: id})
    const result = await Course.findByIdAndRemove(id)
    console.log(result);
}
//removeCourse('6221e9400802840372952adb');
//updateCourseApproach2('6221a2c8659564be1c56f49b');
//updateCourse('6221a2c8659564be1c56f49b');
//getCourses();
/**
 * 1 Aproach: Query first
 *      findById()
 *      Modify its properties
 *      save()
 * 2 Approach: Update first
 *      update directly
 *      Optionally :get the updated document
 * 
 */