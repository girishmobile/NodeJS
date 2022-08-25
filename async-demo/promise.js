
const p = new Promise((resolve, reject)=> {
    //Kik off some async work
    setTimeout(() => {
        resolve(1);
        reject(new Error('message'));

    },2000)
    //reject('error');

});
p
    .then(result => console.log('result',result))
    .catch(err => console.log('error',err.message));