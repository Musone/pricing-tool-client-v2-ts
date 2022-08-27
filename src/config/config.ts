const config = {
    serverUrl: import.meta.env.VITE_SERVER_URL,
    localStorageAccessTokenKey: import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    localStorageRefreshTokenKey: import.meta.env.VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY,

    defaultCounsellingRate: import.meta.env.VITE_DEFAULT_COUNSELLING_RATE,
    defaultSupervisingRate: import.meta.env.VITE_DEFAULT_SUPERVISING_RATE,
}

export default config;