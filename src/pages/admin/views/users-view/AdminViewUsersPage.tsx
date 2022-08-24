import {FunctionComponent, useEffect, useState} from "react";
import useHttpRequest from "../../../../hooks/useHttpRequest";
import {GET_USERS_URL} from "../../../../constants/urls";
import Spinner from "../../../../components/Spinner";
import config from "../../../../config/config";
import UserCard from "./UserCard";
import capitalize from "../../../../utils/capitalize";
import PageWrapper from "../../../../components/PageWrapper";
import IUserObj from "../../../../components/lists/interfaces/IUserObj";
import CreateUserComponent from "../../components/CreateUserComponent";
import SearchBar from "../../../../components/SearchBar";
import Dropdown from "../../../../components/dropdowns/Dropdown";


const AdminViewUsersPage: FunctionComponent<{}> = () => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [filterKey, setFilterKey] = useState('firstName');
    const [trigger, setTrigger] = useState(true);

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

    useEffect(() => {
        setTrigger(!trigger);
    }, [filterKey])

    if (isLoading) {
        return (
            <PageWrapper>
                <Spinner/>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <div className={'w-3/4 max-w-screen-2xl flex justify-center'}>
                {/*<div className={'flex flex-col items-center'}>*/}
                    <CreateUserComponent/>
                    <div className={'flex flex-wrap w-3/4 items-center gap-3 mb-4'}>
                        <SearchBar list={userList} setList={setUserList} objKey={filterKey} trigger={trigger}/>
                        <span className={'font-semibold'}>by</span>
                        <Dropdown noLabel={true} formKey={'filter'} filterList={['firstName', 'lastName', 'email']}
                                  form={{filter: 'firstName'}} noChoose={true}
                                  setForm={((formCopy: { filter: string }) => setFilterKey(formCopy.filter))}/>
                    </div>
            </div>
                {/*</div>*/}
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