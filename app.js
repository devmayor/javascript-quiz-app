const calculus = require('./calculus.js');
const fs = require('fs');
const _ = require('lodash');
const hbs = require('hbs');
const express = require('express');

// process.argv[];
//read to a file we use fs.readFileSync
//write to a file we use fs.writeFileSync
//
// to run a node file in debug module, use the command `bode inspect file.js`
// Use `n` to move line by line
// Use `c` to continue ur app to completion
// Use `repl` to view state of the app in the debug mode
// Use `debugger` inside the program itself to break the code within the app
// U can use nodemon with the debugger
//  to debug using chrome dev, use the command `node --inspect-brk file.js` them go to chrome dev tools
// and use the remote device tab
// Use yargs to create commands

// var check = calculus.add(1,2);
// console.log(check);

 const app = express();

 app.set('view engine','hbs');

 var check = calculus.add(1,2);
 let addval = 0;
 var add = calculus.asyncAdd(20 , 30 , (resp)=>{
    addval = resp;
 })
 app.get('/',(req , res )=>{
    res.render('index',{
        title: "Home page",
        message: "Hello this is my first render " + addval
    });
 })

 app.listen('3001');