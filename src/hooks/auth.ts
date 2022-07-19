import config from "../config/config";
import {UserObj} from "../App";
import {Dispatch, SetStateAction} from "react";
import {string} from "zod";

const {
    serverUrl,
    localStorageAccessTokenKey,
    localStorageRefreshTokenKey,
} = config;

export const LOGIN_URL: RequestInfo = `${serverUrl}/api/sessions`;
export const USER_ME_URL: RequestInfo = `${serverUrl}/api/users/me`;
export const REFRESH_URL: RequestInfo = `${serverUrl}/api/sessions/refresh`;
export const REGISTRATION_URL: RequestInfo = `${serverUrl}/api/users`;
export const VALIDATE_EMAIL_URL: RequestInfo = `${serverUrl}/api/users/verify`;
export const COUNSELOR_ME_URL: RequestInfo = `${serverUrl}/api/counselors/me`;
export const LOGOUT_URL: RequestInfo = `${serverUrl}/api/sessions/logout`;

// ~~~~ Validation Schemas ~~~~~~
export const emailSchema = string().email();
export const passwordSchema = string().min(6);
// ~~~~ Validation Schemas ~~~~~~

export function isPasswordValid(password: string) {
    return passwordSchema.safeParse(password).success;
}

export function isEmailValid(email: string) {
    return emailSchema.safeParse(email).success;
}

/**
 * Attempts to log the user in.
 * Upon successful login, stores the access and refresh token in the browser local storage.
 * Otherwise, throws an error which should be caught by the caller.
 * @param email
 * @param password
 * @param resChain A variable used for getting the status code of failed requests.
 */
export async function login(email: string, password: string, resChain: Response[]) {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
        .then((res) => {
            resChain.push(res);
            if (res.status !== 200) {
                throw new Error('Request rejected');
            }

            return res.json()
        })
        .then(({accessToken, refreshToken}: { accessToken: string, refreshToken: string }) => {
            localStorage.setItem(localStorageAccessTokenKey, accessToken);
            localStorage.setItem(localStorageRefreshTokenKey, refreshToken);
        })
        .catch((e) => {
            throw new Error(e);
        })
}

export async function fetchUserInfo([userContext, setUserContext]: [UserObj | null, Dispatch<SetStateAction<UserObj | null>> | null]) {
    let resChain: Response[] = [];
    let accessToken = localStorage.getItem(localStorageAccessTokenKey);
    let refreshToken = localStorage.getItem(localStorageRefreshTokenKey);

    if (accessToken === null && refreshToken === null) {
        throw new Error('Access token null and Refresh Token are null');
    }

    return fetchUserInfoHelper(accessToken === null ? '' : accessToken, setUserContext, resChain)
        .catch((e) => {
            if (resChain.length < 1 || resChain[resChain.length - 1].status !== 403) {
                throw new Error(e);
            }

            const refreshToken = localStorage.getItem(localStorageRefreshTokenKey);

            if (refreshToken === null) {
                throw new Error('Refresh token null');
            }

            return refreshAccessToken(refreshToken, resChain);
        })
        .then(() => {
            accessToken = localStorage.getItem(localStorageAccessTokenKey);

            if (accessToken === null) {
                throw new Error('Access token still null after attempting to refresh');
            }

            return fetchUserInfoHelper(accessToken, setUserContext, resChain);
        })
        .catch((e) => {
            localStorage.removeItem(localStorageAccessTokenKey);
            throw new Error(e.message);
        });

}

/**
 * Refreshes the access token.
 * If the refresh token is expired, or invalid: Removes refresh token from browser local storage and
 * throws an error instead.
 * Caller should catch errors.
 * @param refreshToken
 * @param lastRes
 */
export async function refreshAccessToken(refreshToken: string, lastRes: Response[]) {
    return fetch(REFRESH_URL, {
        method: 'POST',
        headers: {
            'x-refresh': refreshToken
        }
    })
        .then((res) => {
            lastRes.push(res);
            if (res.status !== 200) {
                throw new Error('Request rejected');
            }

            return res.json()
        })
        .then(({accessToken}: { accessToken: string }) => localStorage.setItem(localStorageAccessTokenKey, accessToken))
        .catch((e) => {
            if (lastRes.length > 0 && lastRes[lastRes.length - 1].status === 401) {
                localStorage.removeItem(localStorageRefreshTokenKey);
                throw new Error('Refresh token expired');
            } else {
                throw new Error(e.message);
            }
        });
}

/**
 * Attempts to fetch user info.
 * Upon success, sets user context
 * Throws error if failed. Caller should catch errors.
 * @param accessToken
 * @param setUserContext
 * @param resChain stores the server response for access to the status code.
 */
const fetchUserInfoHelper = async (accessToken: string, setUserContext: Dispatch<SetStateAction<UserObj | null>> | null, resChain: Response[]) => {
    return fetch(USER_ME_URL, {
        headers: {
            authorization: accessToken
        }
    })
        .then((res) => {
            resChain.push(res);
            if (res.status !== 200) {
                throw new Error('Request rejected');
            }

            return res.json();
        })
        .then((userData: UserObj) => {
            if (setUserContext === null) {
                throw new Error('setUserContext is undefined');
            }
            setUserContext(userData);
        })
        .catch((e) => {
            if (resChain.length > 0 && resChain[resChain.length - 1].status === 403) {
                throw new Error('Got status 403 when trying to get user info.');
            }
        })
}

