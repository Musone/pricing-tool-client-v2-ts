import config from "../config/config";

const {serverUrl} = config

export const LOGIN_URL: RequestInfo = `${serverUrl}/api/sessions`;
export const USER_ME_URL: RequestInfo = `${serverUrl}/api/users/me`;
export const REFRESH_URL: RequestInfo = `${serverUrl}/api/sessions/refresh`;
export const REGISTRATION_URL: RequestInfo = `${serverUrl}/api/users`;
export const VALIDATE_EMAIL_URL: RequestInfo = `${serverUrl}/api/users/verify`;
export const COUNSELOR_ME_URL: RequestInfo = `${serverUrl}/api/counselors/me`;
export const COUNSELOR_URL: RequestInfo = `${serverUrl}/api/counselors`;
export const LOGOUT_URL: RequestInfo = `${serverUrl}/api/sessions/logout`;
export const GET_USERS_URL: RequestInfo = `${serverUrl}/api/users`;
export const GET_FILTERS_URL: RequestInfo = `${serverUrl}/api/filters`;