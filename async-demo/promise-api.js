
const p = Promise.resolve({id:1});
p.then(result => console.log(result));

// const p1 = Promise((resolve) =>{
//     setTimeout(()=>{
//         console.log('Asynch operation 1...');
//         resolve(1);
//     },2000)
// });
// const p2 = Promise((resolve) =>{
//     setTimeout(()=>{
//         console.log('Asynch operation 2...');
//         resolve(2);
//     },2000)
// });
// const allP = Promise.all([p1,p2]);
//     allP.then(result => console.log(result));
//     allP.catch(err => console.log('error',err.message));