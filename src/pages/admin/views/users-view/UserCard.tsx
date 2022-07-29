import {FunctionComponent, useState} from "react";
import capitalize from "../../../../utils/capitalize";
import PrimaryButton_2 from "../../../../components/buttons/PrimaryButton_2";
import PrimaryButton_1 from "../../../../components/buttons/PrimaryButton_1";
import {Link} from "react-router-dom";
import IUserObj from "../../../../components/lists/interfaces/IUserObj";
import config from "../../../../config/config";
import DeleteButton from "../../../../components/buttons/DeleteButton";
import {GET_USERS_URL} from "../../../../constants/urls";


const UserCard: FunctionComponent<{
    user: IUserObj
}> = ({user}) => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [isAdmin, setIsAdmin] = useState(user.roles.includes('admin'));
    const [isCounselor, setIsCounselor] = useState(user.roles.includes('counselor'));
    const [loading, setLoading] = useState(false);

    const handleToggleCounselorButtonClick = () => {
        if (!accessToken) {
            history.go();
            return;
        }
        let body = {roles: [...user.roles]};

        if (user.roles.includes('counselor')) {
            body = {roles: user.roles.filter((value) => value !== 'counselor')};
        } else {
            body.roles.push('counselor');
        }

        setLoading(true);
        fetch(`${config.serverUrl}/api/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken || '',
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (res.status === 409) {
                    throw new Error('Email taken error');
                } else if (res.status !== 200) {
                    throw new Error('Request rejected');
                }
                user.roles = body.roles;
                setIsCounselor(body.roles.includes('counselor'));
            })
            .catch(e => {
                console.error(e);
                alert('Action failed')
            })
            .finally(() => setLoading(false));

    }

    const handleDeleteUserButtonClick = () => {
        if (!accessToken) {
            history.go();
            return;
        }

        setLoading(true);

        fetch(`${GET_USERS_URL}/${user._id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken || '',
            }
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error('delete failed');
                }
                history.go();
            })
            .catch(() => {
                alert('Action failed');
            })
            .finally(() => setLoading(false));
    }

    return (

        <div
            className={'flex flex-wrap lg:grid lg:grid-flow-cols lg:grid-cols-3 border items-center overflow-hidden'}>

            <span className={'p-3 border-x'}>{capitalize(user.firstName) + ' ' + capitalize(user.lastName)}</span>
            <span className={'p-3 border-x'}>{user.email}</span>


            <div className={'flex justify-end gap-5 p-2'}>
                <Link to={`/admin/users/${user._id}`}>
                    <PrimaryButton_2 text={'View Profile'}/>
                </Link>

                <button
                    disabled={loading}
                    onClick={handleToggleCounselorButtonClick}
                    className={`${isCounselor ? 'bg-green-400 hover:bg-green-400/80' : 'bg-orange-400 hover:bg-orange-400/80'} shadow px-3 py-2 rounded max-w-fit text-neutral-900 font-semibold disabled:cursor-not-allowed`}>Counselor
                </button>

                <DeleteButton disabled={loading} onClick={handleDeleteUserButtonClick}/>
            </div>

        </div>

    )
}

export default UserCard;