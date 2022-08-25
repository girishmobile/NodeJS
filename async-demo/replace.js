console.log('Before');
const p = getUser(1);
    p.then(user => console.log(user));
    p.catch(err => console.log('Error', err.message));


function getUser(id){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            console.log('Reading a user from database');
            resolve({id:id, githubusername:'Girish'});
        },2000);
    });
}