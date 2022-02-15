declare class SoundCloudScraper {
    isSoundCloudUrl: (url: string) => boolean;
    extractHydrationData: (url: string) => Promise<any>;
    getSound: (url: string) => Promise<any>;
    getUser: (url: string) => Promise<any>;
}
export { SoundCloudScraper };
