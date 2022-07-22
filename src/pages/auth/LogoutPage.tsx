import {FunctionComponent, ReactElement, useEffect} from "react";
import PageWrapper from "../../components/PageWrapper";
import config from "../../config/config";
import {LOGOUT_URL, REFRESH_URL} from "../../utils/auth";


const LogoutPage: FunctionComponent = (): ReactElement => {
    const refreshToken = localStorage.getItem(config.localStorageRefreshTokenKey);

    useEffect(() => {
        const clearAndRefresh = () => {
            localStorage.removeItem(config.localStorageRefreshTokenKey);
            localStorage.removeItem(config.localStorageAccessTokenKey);
            location.assign('/booking/hero');
        }

        if (refreshToken === null) {
            clearAndRefresh();
            return;
        }

        fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'x-refresh': refreshToken
            }
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error('Something went wrong...');
                }

                clearAndRefresh();
            })
    }, [])

    return (
        <PageWrapper>
            <span className={'font-semibold'}>Logging out...</span>
        </PageWrapper>
    )
}

export default LogoutPage;