import React, {Component, FormEvent, ReactElement, useState} from 'react';
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import {emailSchema, isEmailValid, isPasswordValid, login, passwordSchema, REGISTRATION_URL} from "../../utils/auth";
import Spinner from "../../components/Spinner";
import {emailVerificationPageRoute} from "../../constants/generalRoutes";
import PageWrapper from "../../components/PageWrapper";

const RegisterPage = (): ReactElement => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // ~~ These states are used to control what the page displays. ~~
    const [loading, setLoading] = useState(false);
    const [badFirstname, setBadFirstname] = useState(false);
    const [badLastname, setBadLastname] = useState(false);
    const [badEmail, setBadEmail] = useState(false);
    const [badPassword, setBadPassword] = useState(false);
    const [badConfirmPassword, setBadConfirmPassword] = useState(false);
    const [serverNotResponding, setServerNotResponding] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);

    // ~~ These states are used to control what the page displays. ~~

    /**
     * Sends a POST request attempting to login when forum is submitted.
     * If the response is good: signs the user in, and storing the access and refresh tokens in the browser localStorage,
     * then requests for the user's information, storing it in the UserContext.
     * Skips sending the request if the form inputs are obviously invalid.
     * @param e
     */
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setEmailTaken(false);
        setServerNotResponding(false);
        setServerError(false);

        const isFirstNameInvalid = firstName.split(' ').join('').length < 1;
        const isLastNameInvalid = lastName.split(' ').join('').length < 1;
        const isEmailInvalid = !isEmailValid(email);
        const isPasswordInvalid = !isPasswordValid(password);
        const isConfirmPasswordInvalid = !isPasswordInvalid && password !== passwordConfirmation;

        setBadFirstname(isFirstNameInvalid);
        setBadLastname(isLastNameInvalid);
        setBadEmail(isEmailInvalid);
        setBadPassword(isPasswordInvalid);
        setBadConfirmPassword(isConfirmPasswordInvalid);
        if (isFirstNameInvalid || isLastNameInvalid || isEmailInvalid || isPasswordInvalid || isConfirmPasswordInvalid) {
            setLoading(false);
            return;
        }

        let lastRes: Response | undefined = undefined;
        setLoading(true);

        fetch(REGISTRATION_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation,
            })
        })
            .then((res) => {
                lastRes = res;
                if (res.status !== 200) {
                    throw new Error('Request rejected');
                }
                location.assign(emailVerificationPageRoute.path);
            })
            .catch((e) => {
                if (typeof lastRes === 'undefined') {
                    setServerNotResponding(true);
                    return;
                }

                if (lastRes.status === 409) {
                    setEmailTaken(true);
                }

                if (lastRes.status === 500) {
                    setServerError(true);
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <PageWrapper>
            <form onSubmit={handleSubmit}
                  className={`${loading ? 'blur-sm' : ''} w-full max-w-lg mt-10 shadow-lg p-10`}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input
                            className={`${badFirstname ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                            onChange={(e) => setFirstName(e.target.value)} id="grid-first-name" type="text"
                            placeholder="Carl"/>
                        {badFirstname &&
                            <p className="text-red-500 text-xs italic">First name required</p>
                        }
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input
                            className={`${badLastname ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                            onChange={(e) => setLastName(e.target.value)} id="grid-last-name" type="text"
                            placeholder="Friedrich Guass"/>
                        {badLastname &&
                            <p className="text-red-500 text-xs italic">Last name required</p>
                        }
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-email">
                            Email
                        </label>
                        <input
                            className={`${badEmail || emailTaken ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                            onChange={(e) => setEmail(e.target.value)} id="grid-email" type="text"
                            placeholder="example@gmail.com"/>
                        {badEmail &&
                            <p className="text-red-500 text-xs italic">Invalid email</p>
                        }
                        {emailTaken &&
                            <p className="text-red-500 text-xs italic">Email taken</p>
                        }
                    </div>
                </div>


                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-password">
                            Password
                        </label>
                        <input
                            className={`${badPassword ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                            onChange={(e) => setPassword(e.target.value)} id="grid-password" type="password"
                            placeholder="******************"/>
                        {badPassword &&
                            <p className="text-red-500 text-xs italic">Invalid password</p>
                        }
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-confirm-password">
                            Confirm Password
                        </label>
                        <input
                            className={`${badConfirmPassword || badPassword ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                            onChange={(e) => setPasswordConfirmation(e.target.value)} id="grid-confirm-password"
                            type="password" placeholder="******************"/>
                        {!badPassword && badConfirmPassword &&
                            <p className="text-red-500 text-xs italic">Passwords do not match</p>
                        }
                        {serverError &&
                            <p className="text-red-500 text-xs italic">Server error</p>
                        }
                        {serverNotResponding &&
                            <p className="text-red-500 text-xs italic">Server not responding. Try again later</p>
                        }
                    </div>
                </div>

                <PrimaryButton_1 text={"Register"} type={'submit'}/>
            </form>
            {loading && <div className={'absolute top-36 pl-24 pt-10 w-96 h-96'}><Spinner/></div>}
        </PageWrapper>
    );
}

export default RegisterPage;