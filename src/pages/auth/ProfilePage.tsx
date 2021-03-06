import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import PageWrapper from "../../components/PageWrapper";
import UserProfilePanel from "./UserProfilePanel";
import CounselorProfilePanel from "./CounselorProfilePanel";
import ICounselor from "../../interfaces/ICounselor";
import {COUNSELOR_ME_URL} from "../../utils/auth";
import config from "../../config/config";
import Spinner from "../../components/Spinner";
import UserContext from "../../contexts/UserContext";


const ProfilePage: FunctionComponent = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [counselorInfo, setCounselorInfo] = useState<ICounselor | null>(null);
    const [isNewCounselor, setisNewCounselor] = useState(false);

    useEffect(() => {
        let lastRes: Response | undefined = undefined;
        if (userContext?.roles.includes('counselor')) {
            fetch(COUNSELOR_ME_URL, {
                headers: {
                    authorization: localStorage.getItem(config.localStorageAccessTokenKey) || '',
                }
            })
                .then((res) => {
                    lastRes = res;
                    if (res.status !== 200) {
                        throw new Error();
                    }

                    return res.json()
                })
                .then((data) => {
                    setCounselorInfo(data);
                    console.log({FROM_PROFILE_PAGE: data})
                })
                .catch((err) => {
                    if (typeof lastRes === 'undefined') {
                        // setServerNotResponding(true);
                        return;
                    }

                    if (lastRes.status === 404) {
                        setisNewCounselor(true);
                        return;
                    }
                })
        } else {

        }
    }, [userContext])


    return (
        <PageWrapper>
            <div
                className={`${loading ? 'blur-sm' : ''} max-w-screen-xl mt-12 flex flex-wrap w-3/4 mb-10 border-l border-offWhiteOutline shadow-md px-5 py-5 gap-5`}>

                {userContext !== null && <UserProfilePanel loading={loading} setLoading={setLoading}/>}
            </div>
            {userContext?.roles.includes('counselor') && <>

                <div
                    className={`${loading ? 'blur-sm' : ''} max-w-screen-xl mb-96 mt-5 flex flex-wrap w-full w-3/4 mb-10 border-l border-offWhiteOutline shadow-md px-5 py-5 gap-5`}>

                    {userContext !== null && ((counselorInfo !== null && typeof counselorInfo !== 'undefined') || isNewCounselor) &&
                        <CounselorProfilePanel counselorInfo={counselorInfo ? counselorInfo : undefined}
                                                isCreating={isNewCounselor} setLoading={setLoading} loading={loading}/>

                    }
                </div>
            </>
            }

            <div className={'fixed top-1/2 left-1/2'}>
                {loading && <Spinner/>}
            </div>

        </PageWrapper>
    )
}

export default ProfilePage;