const { snapshot } = require("process-list");
 


function IsBotRunning()
{
    snapshot('pid', 'name').then(tasks => {
        console.log(tasks);
        const result = tasks.filter(word => word.name == 'HustleCastleBOT.exe')
        console.log(result.length > 0 ? result : 'nothing found!');
        return result.length > 0 ? true : false;
    })
}

function KillNox()
{
    snapshot('pid', 'name').then(tasks => {
        console.log(tasks);
        const result = tasks.filter(word => word.name == 'Nox.exe')
        console.log(result.length > 0 ? result : 'nothing found!');
        result.forEach(element => {
            process.kill(element.pid);
        });
    })
}