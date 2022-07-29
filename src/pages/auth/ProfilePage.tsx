import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import PageWrapper from "../../components/PageWrapper";
import UserProfilePanel from "./UserProfilePanel";
import CounselorProfilePanel from "./CounselorProfilePanel";
import ICounselor from "../../components/lists/interfaces/ICounselor";
import {COUNSELOR_ME_URL} from "../../constants/urls";
import config from "../../config/config";
import Spinner from "../../components/Spinner";
import UserContext from "../../contexts/UserContext";
import CounselorProfileApi from "./counselor-profile/CounselorProfileApi";


const ProfilePage: FunctionComponent<{counselorId?: string}> = ({counselorId}) => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [currentUserCounselorProfile, setCurrentUserCounselorProfile] = useState<ICounselor | null>(null);

   /* useEffect(() => {
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
                    setCurrentUserCounselorProfile(data);
                    // console.log({FROM_PROFILE_PAGE: data})
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
    }, [userContext])*/


    return (
        <PageWrapper>
            <div
                className={`${loading ? 'blur-sm' : ''} max-w-screen-xl mt-12 flex flex-wrap w-3/4 mb-10 border-l border-offWhiteOutline shadow-md px-5 py-5 gap-5`}>

                {userContext && <UserProfilePanel loading={loading} setLoading={setLoading}/>}
            </div>

            {userContext?.roles.includes('counselor') &&
            <div className={`${loading ? 'blur-sm' : ''} max-w-screen-xl mt-5 flex flex-wrap w-full w-3/4 mb-10 border-l border-offWhiteOutline shadow-md px-5 py-5 gap-5 overflow-hidden`}>
                <CounselorProfileApi setSpinner={setLoading} counselorId={counselorId}/>
            </div>
            }

            {/*{userContext && (currentUserCounselorProfile || isNewCounselor) &&
                <div
                    className={`${loading ? 'blur-sm' : ''} max-w-screen-xl mb-96 mt-5 flex flex-wrap w-full w-3/4 mb-10 border-l border-offWhiteOutline shadow-md px-5 py-5 gap-5`}>

                    <CounselorProfilePanel currentUserCounselorProfile={currentUserCounselorProfile ? currentUserCounselorProfile : undefined}
                                           isCreating={isNewCounselor} setLoading={setLoading} loading={loading}/>
                </div>
            }*/}

            <div className={'fixed top-1/2 left-1/2'}>
                {loading && <Spinner/>}
            </div>

        </PageWrapper>
    )
}

export default ProfilePage;