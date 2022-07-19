import React, {FormEvent, FunctionComponent, useContext, useEffect, useState} from "react";
import capitalize from "../../hooks/capitalize";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import {UserContext, UserObj} from "../../App";
import {isEmailValid, isPasswordValid, refreshAccessToken} from "../../hooks/auth";
import config from "../../config/config";
import Spinner from "../../components/Spinner";


const UserProfilePanel: FunctionComponent<{loading:boolean, setLoading: CallableFunction}> = ({setLoading, loading}) => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [editProfile, setEditProfile] = useState(false);
    const [badEmail, setBadEmail] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [badPassword, setBadPassword] = useState(false);

    const [badConfirmPassword, setBadConfirmPassword] = useState(false);
    const [serverNotResponding, setServerNotResponding] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [badFirstname, setBadFirstname] = useState(false);
    const [badLastname, setBadLastname] = useState(false);

    const [firstName, setFirstName] = useState(userContext?.firstName || '');
    const [lastName, setLastName] = useState(userContext?.lastName || '');
    const [email, setEmail] = useState(userContext?.email || '');

    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        console.log(lastName);
    }, [lastName])

    function isChanging(k: keyof UserObj, v: string) {
        return userContext !== null && userContext[k] !== v;
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        // setLoading(true);
        setEmailTaken(false);
        setServerNotResponding(false);

        let reqBody: {
            email?: string,
            firstName?: string,
            lastName?: string,
            password?: string,
            passwordConfirmation?: string
        } = {};

        let skip = false;
        const isFirstNameInvalid = firstName.split(' ').join('').length < 1;
        const isLastNameInvalid = lastName.split(' ').join('').length < 1;
        const isEmailInvalid = !isEmailValid(email);
        const isNewPasswordInvalid = !isPasswordValid(newPassword);
        const isConfirmPasswordInvalid = !isNewPasswordInvalid && newPassword !== passwordConfirmation;

        if (isChanging('firstName', firstName)) {
            setBadFirstname(isFirstNameInvalid);
            reqBody.firstName = firstName;
            skip = skip || isFirstNameInvalid;
        }

        if (isChanging('lastName', lastName)) {
            setBadLastname(isLastNameInvalid);
            reqBody.lastName = lastName
            skip = skip || isLastNameInvalid;
        }

        if (isChanging('email', email)) {
            setBadEmail(isEmailInvalid);
            reqBody.email = email
            skip = skip || isEmailInvalid;
        }

        if (newPassword.length > 0) {
            setBadPassword(isNewPasswordInvalid);
            setBadConfirmPassword(isConfirmPasswordInvalid);
            reqBody.password = newPassword;
            reqBody.passwordConfirmation = passwordConfirmation;
            skip = skip || isNewPasswordInvalid || isConfirmPasswordInvalid;
        }

        if (skip) {
            setLoading(false);
            return;
        }

        let lastRes: Response | undefined = undefined;
        const accessToken: string | null = localStorage.getItem(config.localStorageAccessTokenKey);

        fetch(`${config.serverUrl}/api/users/${userContext?._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken || '',
            },
            body: JSON.stringify(reqBody)
        })
            .then((res) => {
                lastRes = res;
                if (res.status !== 200) {
                    throw new Error('Request rejected');
                }

                localStorage.removeItem(config.localStorageAccessTokenKey);
                window.history.go();
            })
            .catch(e => {
                if (typeof lastRes === 'undefined') {
                    setServerNotResponding(true);
                    return;
                }

                if (lastRes.status === 409) {
                    setEmailTaken(true);
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <>


            {userContext && !editProfile && (
                <>
                    <div className={'flex flex-col gap-5 w-full'}>

                        <div className={'flex flex-col px-5 gap-4'}>
                            <div className={'flex flex-col'}>
                                            <span className={'text-2xl font-semibold'}>
                                            {capitalize(userContext.firstName + ' ' + userContext.lastName)}
                                            </span>
                            </div>

                            {userContext.roles.length > 0 &&
                                <div className={'flex flex-col'}>
                                    <label className={'text-sm text-muted'}>roles</label>
                                    <span className={'text-lg'}>
                                    {userContext.roles.join(', ')}
                                    </span>
                                </div>
                            }

                            <div className={'flex flex-col'}>
                                <label className={'text-sm text-muted'}>email</label>
                                <span className={'text-lg'}>
                                {userContext.email}
                                </span>
                            </div>

                        </div>
                    </div>
                    <PrimaryButton_1 loading={loading} text={'Edit Account'} callBack={() => setEditProfile(true)}/>
                </>
            )}

            {userContext && editProfile && (
                <>
                    <form onSubmit={handleSubmit} className={`flex flex-col gap-5 w-full max-w-md`}>

                        <div className={'flex flex-col px-5 gap-4'}>

                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-first-name">
                                    First Name
                                </label>
                                <input
                                    className={`${badFirstname ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                    onChange={(e) => setFirstName(e.target.value)} id="grid-first-name" type="text"
                                    value={firstName}/>
                                {badFirstname &&
                                    <p className="text-red-500 text-xs italic">First name required</p>
                                }
                            </div>

                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input
                                    className={`${badLastname ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                    onChange={(e) => setLastName(e.target.value)} id="grid-last-name" type="text"
                                    value={lastName}/>
                                {badLastname &&
                                    <p className="text-red-500 text-xs italic">Last name required</p>
                                }
                            </div>


                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-email">
                                    Email
                                </label>
                                <input
                                    className={`${badEmail || emailTaken ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                    onChange={(e) => setEmail(e.target.value)} id="grid-email" type="text"
                                    value={email}/>
                                {badEmail &&
                                    <p className="text-red-500 text-xs italic">Invalid email</p>
                                }
                                {emailTaken &&
                                    <p className="text-red-500 text-xs italic">Email taken</p>
                                }
                            </div>


                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-password">
                                    New Password
                                </label>
                                <input
                                    className={`${badPassword ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                    onChange={(e) => setNewPassword(e.target.value)} id="grid-password" type="password"
                                    placeholder="******************"/>
                                {badPassword &&
                                    <p className="text-red-500 text-xs italic">Invalid password</p>
                                }
                            </div>


                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-confirm-password">
                                    Confirm New Password
                                </label>
                                <input
                                    className={`${badConfirmPassword || badPassword ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)} id="grid-confirm-password"
                                    type="password" placeholder="******************"/>
                                {!badPassword && badConfirmPassword &&
                                    <p className="text-red-500 text-xs italic">Passwords do not match</p>
                                }


                                {serverNotResponding &&
                                    <p className="text-red-500 text-xs italic">Server not responding. Try again
                                        later</p>
                                }
                            </div>


                        </div>

                        <div className={'ml-7'}>
                            <PrimaryButton_1 loading={loading} text={'Cancel'} callBack={() => setEditProfile(false)}/>
                            <PrimaryButton_2 loading={loading} text={'Save changes'} type={'submit'}/>
                        </div>
                    </form>
                    {/*{loading && <div className={'absolute top-36 pl-24 pt-10 w-96 h-96'}><Spinner/></div>}*/}
                </>
            )}
        </>
    )
}

export default UserProfilePanel;