const { snapshot } = require("process-list");
 
snapshot('pid', 'name').then(tasks => {
    console.log(tasks);
    const result = tasks.filter(word => word.name == 'HustleCastleBOT.exe')
    console.log(result.length > 0 ? result : 'nothing found!');
})