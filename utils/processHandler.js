import ProcessList from "process-list";

let timer;
var handler = {
  IsBotRunning: async function () {
    let res = "";
    return ProcessList.snapshot("pid", "name").then((tasks) => {
      const result = tasks.filter((word) => word.name == "HustleCastleBOT.exe");
      res = result.length > 0 ? true : false;
      return res;
    });
  },

  KillNox: function () {
    ProcessList.snapshot("pid", "name").then((tasks) => {
      const result = tasks.filter((word) => word.name == "Nox.exe");
      //console.log(result.length > 0 ? result : "nothing found!");
      result.forEach((element) => {
        process.kill(element.pid);
      });
    });
  },

  KillBot: function () {
    ProcessList.snapshot("pid", "name").then((tasks) => {
      const result = tasks.filter((word) => word.name == "HustleCastleBOT.exe");
      //console.log(result.length > 0 ? result : "nothing found!");
      result.forEach((element) => {
        process.kill(element.pid);
      });
    });
  },
};

export { handler };
