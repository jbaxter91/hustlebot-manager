import snapshot from "process-list";
import IsBotRunning from './utils/processHandler.js';
 

// var cp = require("child_process");
// cp.exec('Main.lnk'); // notice this without a callback..
// //process.exit(0); // exit this nodejs process
// console.log(cp);

console.log(IsBotRunning);

// snapshot('pid', 'name').then(tasks => {
//     console.log(tasks);
//     const result = tasks.filter(word => word.name == 'Nox.exe')
//     console.log(result.length > 0 ? result : 'nothing found!');
//     result.forEach(element => {
//         //process.kill(element.pid);
//     });
// })