// const config = {
//     serverUrl: import.meta.env.VITE_SERVER_URL,
//     localStorageAccessTokenKey: import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN_KEY,
//     localStorageRefreshTokenKey: import.meta.env.VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY,
//
//     defaultCounsellingRate: import.meta.env.VITE_DEFAULT_COUNSELLING_RATE,
//     defaultSupervisingRate: import.meta.env.VITE_DEFAULT_SUPERVISING_RATE,
// }
const config = {
    serverUrl: "https://us-central1-phare-app-6fd56.cloudfunctions.net/app",
    localStorageAccessTokenKey: "phareAccessToken",
    localStorageRefreshTokenKey: "phareRefreshToken",

    defaultCounsellingRate: 150,
    defaultSupervisingRate: 150,

    homePageUrl: 'https://www.pharecounselling.com/',
    aboutUsUrl: "https://www.pharecounselling.com/about-us",
    blogUrl: "https://www.pharecounselling.com/mental-health-blog",
    contactUrl: "https://www.pharecounselling.com/get-in-touch",
}

export default config;