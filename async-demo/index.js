//Asynchronous
console.log('Before');
//  getUser(1, (user) =>{
//     getRepositories(user.githubusername, (repos) => {
//         getCommits(repos,displayCommits)
//     });
//  });
console.log('after');
function displayCommits(commits){
    console.log(commits);
}
function getUser(id, callback){
    setTimeout(() =>{
        console.log('Reading a user from database');
        callback({id:id, githubusername:'Girish'});
    },2000);
}
function getRepositories(username,callback){
    setTimeout(() =>{
        console.log('Calling Github API....');
        callback (['Repo1','Repo2','Repo3']);
    },2000)
}
function getCommits(repos,callback){
    setTimeout(() =>{
        console.log('Calling Commit API....');
        callback (['Commit1','Commit2','Commit3']);
    },2000)
}
 //Async and await approach
 async function displayCommits(){
     const user = await getUser(1);
     const repos = await getRepositories(user.githubusername);
     const commit = await getCommits(repos[0]);
     console.log(commit);
 }
 displayCommits();

//Asynch use main 3 method
//1. Callbacks
//2. Promises
//3. Async/await
//Synchronous
    // console.log('Before');
    // const user = getUser(1);
    // const repos = getRepositories(user.githubusername);
    // const commits = getCommits(repos[0]);