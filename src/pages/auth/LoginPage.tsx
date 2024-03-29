import React, {
    Component,
    Dispatch,
    FormEvent, FunctionComponent,
    ReactElement,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react';
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import Spinner from "../../components/Spinner";
import {isEmailValid, isPasswordValid, login} from "../../utils/auth";
import PageWrapper from "../../components/PageWrapper";
import {Link} from "react-router-dom";
import {emailVerificationPageRoute, forgotPasswordPageRoute} from "../../constants/generalRoutes";
import {VERIFY_EMAIL_URL} from "../../constants/urls";

/**
 * todo: I could do the error handling better in here.
 * @constructor
 */

const LoginPage: FunctionComponent<{redirectPath?: string}> = ({redirectPath}): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ~~ These states are used to control what the page displays. ~~
    const [loading, setLoading] = useState(false);
    const [badEmail, setBadEmail] = useState(false);
    const [badPassword, setBadPassword] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const [notVerified, setNotVerified] = useState(false);
    const [serverNotResponding, setServerNotResponding] = useState(false);
    const [id, setId] = useState('');

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
        setFailedLogin(false);
        setServerNotResponding(false);
        setNotVerified(false);

        const isEmailInvalid = !isEmailValid(email);
        const isPasswordInvalid = !isPasswordValid(password);

        setBadEmail(isEmailInvalid);
        setBadPassword(isPasswordInvalid);

        if (isEmailInvalid || isPasswordInvalid) {
            return;
        }

        // todo: Need to test the error handling.

        setLoading(true);
        let resChain: Response[] = [];
        login(email, password, resChain)
            .then(() => {
                // return fetchUserInfo([userContext, setUserContext]);
                location.assign(redirectPath ?? '/booking/hero');
            })
            .catch((e) => {
                if (resChain.length < 1) {
                    setServerNotResponding(true);
                }

                if (resChain[resChain.length - 1].status === 401) {
                    setFailedLogin(true);
                }

                if (resChain[resChain.length - 1].status === 403) {
                    setNotVerified(true);
                    resChain[resChain.length - 1].json().then((data) => setId(data.id));
                }

                console.error(e);
            })
            .finally(() => {
                setLoading(false);
            });

    }


    return (
        <PageWrapper>
            <div className={"flex flex-col items-center py-28 w-full"}>
                <div className={`max-w-xs ${loading ? 'blur-sm' : ''}`}>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                                Email
                            </label>
                            <input
                                className={`border ${badEmail || failedLogin ? 'border-red-500' : ''} shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                id="Email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <p className="text-red-500 text-xs italic">{badEmail && 'Invalid email'}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className={`border ${badPassword || failedLogin ? 'border-red-500' : ''} shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                                id="password" type="password" placeholder="******************"
                                onChange={(e) => setPassword(e.target.value)}/>
                            <p className="text-red-500 text-xs italic">{badPassword && 'Invalid password'}</p>
                            <p className="text-red-500 text-xs italic">{failedLogin && 'Invalid email or password'}</p>
                            <p className="text-red-500 text-xs italic">{notVerified && (
                                <>
                                Please <a onClick={() => fetch(`${VERIFY_EMAIL_URL}/${id}`).then(() => location.assign(emailVerificationPageRoute.path))} className={'hover:underline hover:cursor-pointer text-secondary_4'} >verify</a> your email
                                </>
                            )}</p>
                            <p className="text-red-500 text-xs italic">{serverNotResponding && 'Server not responding. Please try again later.'}</p>
                        </div>
                        <div className="flex items-center justify-between">

                            <PrimaryButton_2 text={"Sign In"} type={'submit'}/>

                            <Link to={forgotPasswordPageRoute.path} className="inline-block align-baseline font-bold text-sm text-secondary_4 hover:text-secondary_4/70">
                                    Forgot Password?
                            </Link>

                        </div>
                    </form>
                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2022 Phare
                </p>

                {/*<div*/}
                {/*    className={'w-96 h-96 bg-pink-600'}>{(userContext !== null && JSON.stringify(userContext, null, 2)) || 'no data'}</div>*/}


                {loading && <div className={'absolute pl-24 pt-10 w-96 h-96'}><Spinner/></div>}

            </div>
        </PageWrapper>
    );
}

export default LoginPage;
