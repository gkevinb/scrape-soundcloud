import { SoundCloudScraper } from "../lib/index.js";
import * as sound from "../examples/sound.json" assert {type: "json"};
import * as user from "../examples/user.json" assert {type: "json"};
import { assert, expect } from "chai"

describe("Soundcloud", function () {
  it("Pokemon Jazz Covers", async function () {
    const soundScraper = new SoundCloudScraper();
    let url =
      "https://soundcloud.com/tenpers/pokemon-jazz-covers";
    let res = await soundScraper.getSound(url);

    expect(Object.keys(sound.default)).to.eql(Object.keys(res));
  });

  it("Kingdom Hearts relaxing music", async function () {
    const soundScraper = new SoundCloudScraper();
    let url =
      "https://soundcloud.com/tenpers/kingdom-hearts-relaxing-music-rainstorm-sounds";
    let res = await soundScraper.getSound(url);

    expect(Object.keys(sound.default)).to.eql(Object.keys(res));
  });

  it("User for Kingdom Hearts relaxing music", async function () {
    const soundScraper = new SoundCloudScraper();
    let url =
      "https://soundcloud.com/tenpers/kingdom-hearts-relaxing-music-rainstorm-sounds";
    let res = await soundScraper.getUser(url);

    expect(Object.keys(user.default)).to.eql(Object.keys(res));
  });
});
