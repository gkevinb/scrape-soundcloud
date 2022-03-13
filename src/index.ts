import * as cheerio from "cheerio";
import axios from "axios";

export interface User {
  avatar_url:            string;
  city:                  null;
  comments_count:        number;
  country_code:          null;
  created_at:            Date;
  creator_subscriptions: CreatorSubscription[];
  creator_subscription:  CreatorSubscription;
  description:           string;
  followers_count:       number;
  followings_count:      number;
  first_name:            string;
  full_name:             string;
  groups_count:          number;
  id:                    number;
  kind:                  string;
  last_modified:         Date;
  last_name:             string;
  likes_count:           number;
  playlist_likes_count:  number;
  permalink:             string;
  permalink_url:         string;
  playlist_count:        number;
  reposts_count:         null;
  track_count:           number;
  uri:                   string;
  urn:                   string;
  username:              string;
  verified:              boolean;
  visuals:               Visuals;
  badges:                Badges;
  station_urn:           string;
  station_permalink:     string;
  url:                   string;
}

export interface Sound {
  artwork_url:         string;
  caption:             null;
  commentable:         boolean;
  comment_count:       number;
  created_at:          Date;
  description:         string;
  downloadable:        boolean;
  download_count:      number;
  duration:            number;
  full_duration:       number;
  embeddable_by:       string;
  genre:               string;
  has_downloads_left:  boolean;
  id:                  number;
  kind:                string;
  label_name:          null;
  last_modified:       Date;
  license:             string;
  likes_count:         number;
  permalink:           string;
  permalink_url:       string;
  playback_count:      number;
  public:              boolean;
  publisher_metadata:  PublisherMetadata;
  purchase_title:      null;
  purchase_url:        null;
  release_date:        null;
  reposts_count:       number;
  secret_token:        null;
  sharing:             string;
  state:               string;
  streamable:          boolean;
  tag_list:            string;
  title:               string;
  track_format:        string;
  uri:                 string;
  urn:                 string;
  user_id:             number;
  visuals:             null;
  waveform_url:        string;
  display_date:        Date;
  media:               Media;
  station_urn:         string;
  station_permalink:   string;
  track_authorization: string;
  monetization_model:  string;
  policy:              string;
  user:                User;
}

export interface Media {
  transcodings: Transcoding[];
}

export interface Transcoding {
  url:      string;
  preset:   string;
  duration: number;
  snipped:  boolean;
  format:   Format;
  quality:  string;
}

export interface Format {
  protocol:  string;
  mime_type: string;
}

export interface PublisherMetadata {
  id:             number;
  urn:            string;
  contains_music: boolean;
}

export interface User {
  avatar_url:            string;
  city:                  null;
  comments_count:        number;
  country_code:          null;
  created_at:            Date;
  creator_subscriptions: CreatorSubscription[];
  creator_subscription:  CreatorSubscription;
  description:           string;
  followers_count:       number;
  followings_count:      number;
  first_name:            string;
  full_name:             string;
  groups_count:          number;
  id:                    number;
  kind:                  string;
  last_modified:         Date;
  last_name:             string;
  likes_count:           number;
  playlist_likes_count:  number;
  permalink:             string;
  permalink_url:         string;
  playlist_count:        number;
  reposts_count:         null;
  track_count:           number;
  uri:                   string;
  urn:                   string;
  username:              string;
  verified:              boolean;
  visuals:               Visuals;
  badges:                Badges;
  station_urn:           string;
  station_permalink:     string;
}

export interface Badges {
  pro:           boolean;
  pro_unlimited: boolean;
  verified:      boolean;
}

export interface CreatorSubscription {
  product: Product;
}

export interface Product {
  id: string;
}

export interface Visuals {
  urn:      string;
  enabled:  boolean;
  visuals:  Visual[];
  tracking: null;
}

export interface Visual {
  urn:        string;
  entry_time: number;
  visual_url: string;
}


export interface HydrationObject {
  hydratable: string;
  data: string | object | Sound | User;
}


class SoundCloudScraper {
  isSoundCloudUrl = (url: string) => {
    if (!url) {
      return false;
    }
    return url.startsWith("https://soundcloud.com/");
  };

  getHtmlFromUrl = async (url :string) => {
    const response = await axios.get(url);
    return response.data
  }

  extractDataFromHtml = (htmlString: string) => {
    const HYDRATION_STRING = "window.__sc_hydration = ";
    let $ = cheerio.load(htmlString);
    let scriptString: string;
    for (let script of $("script:not([src])").toArray()) {
      scriptString = (script.children[0] as any).data;
      if (scriptString.startsWith(HYDRATION_STRING)) {
        return JSON.parse(
          scriptString.replace(HYDRATION_STRING, "").slice(0, -1)
        );
      }
    }
  }

  extractSound = (htmlString: string) => {
    const listOfHyrdrationData : Array<HydrationObject> = this.extractDataFromHtml(htmlString)
    for (let obj of listOfHyrdrationData) {
      if (obj.hydratable === "sound") {
        return obj.data as Sound;
      }
    }
    console.log("No sound data found");
    return {} as Sound;
  }

  extractHydrationData = async (url: string) => {
    try {
      const htmlString = await this.getHtmlFromUrl(url);
      const data = this.extractDataFromHtml(htmlString)
      return data
    } catch (error) {
      console.error(error);
      console.log("No hydration data");
      return [];
    }
  };

  getSound = async (url: string): Promise<Sound> => {
    if (!this.isSoundCloudUrl(url)) {
      console.log("Not a SoundCloud url given");
      return {} as Sound;
    }

    const htmlString: string = await this.getHtmlFromUrl(url)
    return this.extractSound(htmlString) as Sound;
  };

  getUser = async (url: string): Promise<User> => {
    if (!this.isSoundCloudUrl(url)) {
      console.log("Not a SoundCloud url given");
      return {} as User;
    }

    const listOfHyrdrationData: Array<HydrationObject> = await this.extractHydrationData(url);
    for (let obj of listOfHyrdrationData) {
      if (obj.hydratable === "user") {
        return obj.data as User;
      }
    }
    console.log("No user data found");
    return {} as User;
  };
}

export { SoundCloudScraper }