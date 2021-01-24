import { handler } from "./utils/processHandler.js";
import profile from "./utils/profileManager.js";
import fs from "fs";
import util from 'util';
import cp from"child_process";
import path from 'path';

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

let rawdata = fs.readFileSync("config.json");
let config = JSON.parse(rawdata);
let emulatorDelay = config.emulatorDelay * 1000;
let lastRun = config.lastRun;
let profiles = profile.ProfileList();
let profileIndex = 0;
let __dirname = path.resolve();

console.log(`Last Run Profile: ${lastRun}`);

function WatchBot()
{
    let timer = setInterval(() => {
    handler.IsBotRunning()
    .then(res => {
        if (!res) {
            console.log("Bot Stopped");
            clearInterval(timer);
            handler.KillNox();
            ChangeProfile();
          } else {
            console.log("Bot Running");
          }
    })
  
    }, 1000);
}

//console.log(profile.ProfileList());
Startup();

async function Startup()
{
    if(profiles.length == 0){
        console.log("No Profiles Found!");
        return;
    }

    if(lastRun)
    {
        for (let i = 0; i < profiles.length; i++) {
            const element = profiles[i];
            if(element == lastRun)
            profileIndex = i;
        }
    }

    await ChangeProfile();

    //console.log(`Trying to launch emulator at ${__dirname}/profiles/${profiles[profileIndex]}/${profiles}.lnk`);
    cp.exec(`${__dirname}/profiles/${profiles[profileIndex]}/${profiles}.lnk`);
    
    console.log(`${__dirname}/bot/HustleCastleBOT.exe`);

    let emulatorDelayTimer 
    console.log(`Waiting to start bot for ${emulatorDelay} miliseconds`);
    setTimeout(() => {
        console.log("Launching Bot now");
        cp.exec(`start ${__dirname}/bot/bot.lnk`,function(error,stdout,stderr){if(error)console.log(error);});
        clearTimeout(emulatorDelayTimer);
        //Wait for bot to be fully setup before watching
        setTimeout(() => 
        {
            console.log("Watching Bot!");
            WatchBot();
        },20000)
        
    }, emulatorDelay);
    
    

    
}

function GetProfileConfig()
{
    return readFile(`./profiles/${profiles[profileIndex]}/config.txt`);
}


async function ChangeProfile() {
  if (profileIndex >= profiles.length - 1) {
    profileIndex = 0;
  }

  //console.log(profiles);
  //console.log(profiles[profileIndex]);

  GetProfileConfig()
  .then((res) => {
    console.log("response",res);
    fs.writeFile("./bot/config.txt", res, function (err) {
        if (err) return console.log(err);
      });
  });

  
}
