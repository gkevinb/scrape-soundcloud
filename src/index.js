import cheerio from "cheerio";
import axios from "axios";

class SoundCloudScraper {
  isSoundCloudUrl = (url) => {
    if (!url) {
      return false;
    }
    return url.startsWith("https://soundcloud.com/");
  };

  extractHydrationData = async (url) => {
    try {
      const HYDRATION_STRING = "window.__sc_hydration = ";
      const response = await axios.get(url);
      let $ = cheerio.load(response.data);
      let scriptData;
      for (let script of $("script:not([src])")) {
        scriptData = script.children[0].data;
        if (scriptData.startsWith(HYDRATION_STRING)) {
          return JSON.parse(
            scriptData.replace(HYDRATION_STRING, "").slice(0, -1)
          );
        }
      }
    } catch (error) {
      console.error(error);
      console.log("No hydration data");
      return [];
    }
  };

  getSound = async (url) => {
    if (!this.isSoundCloudUrl(url)) {
      console.log("Not a SoundCloud url given");
      return {};
    }

    const listOfHyrdrationData = await this.extractHydrationData(url);
    for (let obj of listOfHyrdrationData) {
      if (obj.hydratable === "sound") {
        return obj.data;
      }
    }
    console.log("No sound data found");
    return {};
  };

  getUser = async (url) => {
    if (!this.isSoundCloudUrl(url)) {
      console.log("Not a SoundCloud url given");
      return {};
    }

    const listOfHyrdrationData = await this.extractHydrationData(url);
    for (let obj of listOfHyrdrationData) {
      if (obj.hydratable === "user") {
        return obj.data;
      }
    }
    console.log("No user data found");
    return {};
  };
}

export { SoundCloudScraper }