// import { SoundCloudScraper } from "../src/index.js"

const { SoundCloudScraper } = require("../lib/index.js")

// import { SoundCloudScraper} from "../lib/index.js"

const sound = new SoundCloudScraper()

let url = "https://soundcloud.com/tenpers/kingdom-hearts-relaxing-music-rainstorm-sounds"
let res = await sound.getSound(url)

console.log(res)