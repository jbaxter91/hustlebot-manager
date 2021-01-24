import { handler } from "./utils/processHandler.js";
import profile from "./utils/profileManager.js";
import fs from "fs";
import util from 'util';
import cp from"child_process";
import path from 'path';
import env from 'dotenv';

env.config();

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

let rawdata = fs.readFileSync("config.json");
let config = JSON.parse(rawdata);
let emulatorDelay = config.emulatorDelay * 1000;
let lastRun = config.lastRun;
let profiles = profile.ProfileList();
let profileIndex = null;
let __dirname = path.resolve();

console.log(`Last Run Profile: ${lastRun}`);
console.log(`profiles: ${profiles}`);

function WatchBot()
{
    let timer = setInterval(() => {
    handler.IsBotRunning()
    .then(res => {
        if (!res) {
            console.log("Bot Stopped");
            clearInterval(timer);
            handler.KillNox();
            console.clear();
            Startup();
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

    if(profileIndex == null)
    {
        console.log("No Profile Index found");
        for (let i = 0; i < profiles.length; i++) {
            const element = profiles[i];
            if(element == lastRun)
            profileIndex = i;
        }
    }

    await ChangeProfile();

    console.log(`Trying to launch emulator at ${__dirname}/profiles/${profiles[profileIndex]}/${profiles[profileIndex]}.lnk`);
    cp.exec(`${__dirname}/profiles/${profiles[profileIndex]}/${profiles[profileIndex]}.lnk`);
    
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
        },10000)
        
    }, emulatorDelay);
    
    

    
}

function GetProfileConfig()
{
    return readFile(`./profiles/${profiles[profileIndex]}/config.txt`);
}


async function ChangeProfile() {
    console.log(`Profile Index to start: ${profileIndex}`);
    console.log(`Profile Length ${profiles.length}`);
    profileIndex++;
    console.log(`Profile Index to after bump: ${profileIndex}`);
  if (profileIndex > (profiles.length - 1)) {
    console.log("Returning to 0");
    profileIndex = 0;
  }
  console.log(profileIndex);

  console.log(`Changing Profile`);

  await SetLicense();

  //console.log(profiles);
  console.log(`Getting config for profile: ${profiles[profileIndex]}`);

  GetProfileConfig()
  .then((res) => {
    //console.log("response",res);
    fs.writeFile("./bot/config.txt", res, function (err) {
        if (err) return console.log(err);
      });

        config.lastRun = profiles[profileIndex];
        let data = JSON.stringify(config);
        fs.writeFileSync('config.json', data);
  });
}

async function SetLicense()
{
    fs.writeFile("./bot/license.txt", `email = ${process.env.HUSTLEBOT_EMAIL}\nkey =${process.env.HUSTLEBOT_KEY}`, function (err) {
        if (err) return console.log(err);
      });
}
