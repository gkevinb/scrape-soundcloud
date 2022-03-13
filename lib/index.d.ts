export interface User {
    avatar_url: string;
    city: null;
    comments_count: number;
    country_code: null;
    created_at: Date;
    creator_subscriptions: CreatorSubscription[];
    creator_subscription: CreatorSubscription;
    description: string;
    followers_count: number;
    followings_count: number;
    first_name: string;
    full_name: string;
    groups_count: number;
    id: number;
    kind: string;
    last_modified: Date;
    last_name: string;
    likes_count: number;
    playlist_likes_count: number;
    permalink: string;
    permalink_url: string;
    playlist_count: number;
    reposts_count: null;
    track_count: number;
    uri: string;
    urn: string;
    username: string;
    verified: boolean;
    visuals: Visuals;
    badges: Badges;
    station_urn: string;
    station_permalink: string;
    url: string;
}
export interface Sound {
    artwork_url: string;
    caption: null;
    commentable: boolean;
    comment_count: number;
    created_at: Date;
    description: string;
    downloadable: boolean;
    download_count: number;
    duration: number;
    full_duration: number;
    embeddable_by: string;
    genre: string;
    has_downloads_left: boolean;
    id: number;
    kind: string;
    label_name: null;
    last_modified: Date;
    license: string;
    likes_count: number;
    permalink: string;
    permalink_url: string;
    playback_count: number;
    public: boolean;
    publisher_metadata: PublisherMetadata;
    purchase_title: null;
    purchase_url: null;
    release_date: null;
    reposts_count: number;
    secret_token: null;
    sharing: string;
    state: string;
    streamable: boolean;
    tag_list: string;
    title: string;
    track_format: string;
    uri: string;
    urn: string;
    user_id: number;
    visuals: null;
    waveform_url: string;
    display_date: Date;
    media: Media;
    station_urn: string;
    station_permalink: string;
    track_authorization: string;
    monetization_model: string;
    policy: string;
    user: User;
}
export interface Media {
    transcodings: Transcoding[];
}
export interface Transcoding {
    url: string;
    preset: string;
    duration: number;
    snipped: boolean;
    format: Format;
    quality: string;
}
export interface Format {
    protocol: string;
    mime_type: string;
}
export interface PublisherMetadata {
    id: number;
    urn: string;
    contains_music: boolean;
}
export interface User {
    avatar_url: string;
    city: null;
    comments_count: number;
    country_code: null;
    created_at: Date;
    creator_subscriptions: CreatorSubscription[];
    creator_subscription: CreatorSubscription;
    description: string;
    followers_count: number;
    followings_count: number;
    first_name: string;
    full_name: string;
    groups_count: number;
    id: number;
    kind: string;
    last_modified: Date;
    last_name: string;
    likes_count: number;
    playlist_likes_count: number;
    permalink: string;
    permalink_url: string;
    playlist_count: number;
    reposts_count: null;
    track_count: number;
    uri: string;
    urn: string;
    username: string;
    verified: boolean;
    visuals: Visuals;
    badges: Badges;
    station_urn: string;
    station_permalink: string;
}
export interface Badges {
    pro: boolean;
    pro_unlimited: boolean;
    verified: boolean;
}
export interface CreatorSubscription {
    product: Product;
}
export interface Product {
    id: string;
}
export interface Visuals {
    urn: string;
    enabled: boolean;
    visuals: Visual[];
    tracking: null;
}
export interface Visual {
    urn: string;
    entry_time: number;
    visual_url: string;
}
export interface HydrationObject {
    hydratable: string;
    data: string | object | Sound | User;
}
declare class SoundCloudScraper {
    isSoundCloudUrl: (url: string) => boolean;
    getHtmlFromUrl: (url: string) => Promise<any>;
    extractDataFromHtml: (htmlString: string) => any;
    extractSound: (htmlString: string) => Sound;
    extractHydrationData: (url: string) => Promise<any>;
    getSound: (url: string) => Promise<Sound>;
    getUser: (url: string) => Promise<User>;
}
export { SoundCloudScraper };
