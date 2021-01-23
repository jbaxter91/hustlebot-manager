import ProcessList from "process-list";

module.exports = {

IsBotRunning: function() {
  snapshot("pid", "name").then((tasks) => {
    console.log(tasks);
    const result = tasks.filter((word) => word.name == "HustleCastleBOT.exe");
    console.log(result.length > 0 ? result : "nothing found!");
    return result.length > 0 ? true : false;
  });
},

KillNox: function() {
  snapshot("pid", "name").then((tasks) => {
    console.log(tasks);
    const result = tasks.filter((word) => word.name == "Nox.exe");
    console.log(result.length > 0 ? result : "nothing found!");
    result.forEach((element) => {
      //process.kill(element.pid);
    });
  });
},
};
