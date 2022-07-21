const config = {
    // serverUrl: 'http://localhost:5000',
    // serverUrl: 'https://phare-counselor-finder-api.herokuapp.com',
    serverUrl: import.meta.env.VITE_SERVER_URL,
    localStorageAccessTokenKey: import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    localStorageRefreshTokenKey: import.meta.env.VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY,
}

export default config;