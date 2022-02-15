// import { SoundCloudScraper } from "../src/index.js"

import { SoundCloudScraper} from "../lib/index.js"

const sound = new SoundCloudScraper()

let url = "https://soundcloud.com/tenpers/kingdom-hearts-relaxing-music-rainstorm-sounds"
let res = await sound.getSound(url)





console.log(res)

// file system module to perform file operations
import fs from "fs"
 
 
// stringify JSON Object
var jsonContent = JSON.stringify(res);
console.log(jsonContent);
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});