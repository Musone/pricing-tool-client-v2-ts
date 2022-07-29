import {FunctionComponent, useEffect, useState} from "react";
import useHttpRequest from "../../../../hooks/useHttpRequest";
import {GET_USERS_URL} from "../../../../constants/urls";
import Spinner from "../../../../components/Spinner";
import config from "../../../../config/config";
import UserCard from "./UserCard";
import capitalize from "../../../../utils/capitalize";
import PageWrapper from "../../../../components/PageWrapper";
import IUserObj from "../../../../components/lists/interfaces/IUserObj";

const AdminViewUsersPage: FunctionComponent<{}> = () => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);

    useEffect(() => {

        if (accessToken === null) {
            history.go();
            return;
        }

        fetch(`${GET_USERS_URL}`, {
            headers: {
                'authorization': accessToken,
            }
        })
            .then((res) => res.json())
            .then((data) => setUserList(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));


    }, [])

    if (isLoading) {
        return (
            <PageWrapper>
                <Spinner/>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <div className={'w-3/4 max-w-screen-xl'}>
                <div className={'grid grid-flow-cols grid-cols-3 p-3 gap-2 border'}>
                    <span className={''}>Name</span>
                    <span className={''}>Email</span>
                </div>
                <div>{userList.map((userData: IUserObj, i) => <UserCard key={i} user={userData}/>)}</div>
            </div>
        </PageWrapper>
    )
}

export default AdminViewUsersPage;