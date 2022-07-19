import React, {FormEvent, FunctionComponent, useEffect, useState} from "react";
import PageWrapper from "../../components/PageWrapper";
import {useLocation} from "react-router-dom";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import Spinner from "../../components/Spinner";
import config from "../../config/config";
import {isEmailValid, isPasswordValid} from "../../hooks/auth";


const ForgotPasswordPage: FunctionComponent = () => {

    const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [serverNotResponding, setServerNotResponding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [queryMissing, setQueryMissing] = useState(false);

    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [badPassword, setBadPassword] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [badConfirmPassword, setBadConfirmPassword] = useState(false);

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const resetCode = new URLSearchParams(search).get('code');

    useEffect(() => {
        setLoading(true);
        if (id === null || resetCode === null) {
            setQueryMissing(true);
        }
        setLoading(false);
    }, [])

    function handleSubmitPassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let lastRes: Response | undefined = undefined;
        setLoading(true);

        const passwordInvalid = !isPasswordValid(password);

        if (passwordInvalid) {
            setBadPassword(true);
            setLoading(false);
            return;
        } else {
            setBadPassword(false);
        }

        if (password !== passwordConfirmation) {
            setBadConfirmPassword(true);
            setLoading(false);
            return;
        } else {
            setBadConfirmPassword(false);
        }



        fetch(`${config.serverUrl}/api/users/resetPassword/${id}/${resetCode}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                passwordConfirmation: passwordConfirmation,
            })
        })
            .then((res) => {
                lastRes = res;
                if (res.status !== 200) {
                    throw new Error('Failed to validate user')
                }

                setRequestSent(true);
                setPasswordResetSuccessful(true);
            })
            .catch((e) => {
                setRequestSent(true);

                if (typeof lastRes === 'undefined') {
                    setServerNotResponding(true);
                    throw new Error(e);
                }

                if (lastRes.status === 400) {
                    setPasswordResetSuccessful(false);
                    throw new Error('Server failed to reset password');
                }
            })
            .finally(() => setLoading(false));
    }

    function handleSubmitEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // setLoading(true);
        let lastRes: Response | undefined = undefined;

        const emailInvalid = !isEmailValid(email);

        if (emailInvalid) {
            setBadPassword(true);
            // setLoading(false);
            return;
        } else {
            setBadPassword(false);
        }

        fetch(`${config.serverUrl}/api/users/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                })
            }
        )
            .then((res) => {
                lastRes = res;
                if (res.status !== 200) {
                    throw new Error('Unkown error has occured')
                }
                setRequestSent(true);
            })
            .catch((e) => {
                if (typeof lastRes === 'undefined') {
                    setServerNotResponding(true);
                    throw new Error(e);
                }
                throw new Error(e);
            })
    }

    return (
        <PageWrapper>
            {/*{!emailSent &&*/}
            {/*    <span className={'my-16 font-bold text-xl'}>A password reset link has been sent to your email.</span>}*/}

            {!loading && serverNotResponding &&
                <span className={'px-8 my-16 font-bold text-xl'}>Server not responding. Try again later.</span>}

            {!loading && queryMissing && requestSent && !serverNotResponding &&
                <span className={'px-8 my-16 font-bold text-xl'}>A password reset link has been sent to the email if there is an account associated with it.</span>}

            {!loading && queryMissing && !requestSent && !serverNotResponding && (<>
                    <form onSubmit={handleSubmitEmail}
                          className={`w-full max-w-lg mt-10 p-10`}>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="flex flex-col gap-6 w-full px-3 ">
                                <span
                                    className={'font-semibold text-lg'}>Enter your email and we'll send you a reset link</span>
                                <div>
                                    <input
                                        placeholder={'Email'}
                                        className={`${badPassword ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                        onChange={(e) => setEmail(e.target.value)} id="grid-email" type="text"/>
                                    {badPassword &&
                                        <p className="text-red-500 text-xs italic">Invalid email</p>
                                    }
                                </div>
                                <PrimaryButton_1 text={"Reset password"} type={'submit'}/>
                            </div>
                        </div>
                    </form>
                </>
            )}

            {!loading && !queryMissing && requestSent && !serverNotResponding && passwordResetSuccessful &&
                <span className={'px-8 my-16 font-bold text-xl'}>Your password has been reset. Please login.</span>}

            {!loading && !queryMissing && requestSent && !serverNotResponding && !passwordResetSuccessful &&
                <span className={'px-8 my-16 font-bold text-xl'}>Server failed to reset password.</span>}

            {!loading && !queryMissing && !requestSent && !serverNotResponding && (<>
                    <form onSubmit={handleSubmitPassword}
                          className={`${loading ? 'blur-sm' : ''} w-full max-w-lg mt-10 p-10`}>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="flex flex-col gap-6 w-full px-3 ">
                                <div>
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="password">
                                        New Password
                                    </label>
                                    <div>
                                        <input
                                            className={`border ${badPassword ? 'border-red-500' : ''} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                            id="password" type="password" placeholder="******************"
                                            onChange={(e) => setPassword(e.target.value)}/>
                                        <p className="text-red-500 text-xs italic">{badPassword && 'Invalid password'}</p>
                                    </div>
                                </div>


                                <div>
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-confirm-password">
                                        Confirm Password
                                    </label>
                                    <input
                                        className={`${badConfirmPassword || badPassword ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        id="grid-confirm-password"
                                        type="password" placeholder="******************"/>
                                    {!badPassword && badConfirmPassword &&
                                        <p className="text-red-500 text-xs italic">Passwords do not match</p>
                                    }
                                </div>
                            <PrimaryButton_1 text={"Reset password"} type={'submit'}/>
                            </div>
                        </div>
                    </form>


                    {loading && <div className={'absolute top-36 pl-24 pt-10 w-96 h-96'}><Spinner/></div>}
                </>
            )}

        </PageWrapper>
    )
}


export default ForgotPasswordPage;