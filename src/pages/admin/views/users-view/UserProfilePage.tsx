import PageWrapper from "../../../../components/PageWrapper";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {GET_USERS_URL} from "../../../../constants/urls";
import config from "../../../../config/config";
import Spinner from "../../../../components/Spinner";

import IUserObj from "../../../../components/lists/interfaces/IUserObj";
import UserContext from "../../../../contexts/UserContext";
import ProfilePage from "../../../auth/ProfilePage";


const UserProfilePage = () => {
    const id = useParams()['id'];
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [isLoading, setIsLoading] = useState(true)
    const [userContext, setUserContext] = useState<IUserObj | null>(null);
    const [error, setError] = useState<'SERVER' | null>(null)

    useEffect(() => {
        if (accessToken === null) {
            throw new Error('No access token available');
        }

        fetch(`${GET_USERS_URL}?id=${id}`, {
            headers: {
                'authorization': accessToken
            }
        })
            .then((res) => res.json())
            .then((data) => setUserContext(data[0]))
            .catch((err) => setError('SERVER'))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <PageWrapper><Spinner/></PageWrapper>


    return (
        <UserContext.Provider value={[userContext, setUserContext]}>
            <PageWrapper>
                {userContext && <ProfilePage counselorId={userContext._id}/>}
            </PageWrapper>
        </UserContext.Provider>
    )
}

export default UserProfilePage;