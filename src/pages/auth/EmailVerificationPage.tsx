import {FunctionComponent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import {VALIDATE_EMAIL_URL} from "../../constants/urls";


const EmailVerificationPage: FunctionComponent = (props) => {
    const [verificationSuccessful, setVerificationSuccessful] = useState(false);
    const [serverNotResponding, setServerNotResponding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [queryMissing, setQueryMissing] = useState(false);


    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const verificationCode = new URLSearchParams(search).get('code');

    useEffect(() => {
        let lastRes: Response | undefined;

        setLoading(true);

        if (id === null || verificationCode === null) {
            setQueryMissing(true);
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(`${VALIDATE_EMAIL_URL}/${id}/${verificationCode}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                lastRes = res;
                if (res.status !== 200) {
                    throw new Error('Failed to validate user')
                }
                setVerificationSuccessful(true);
            })
            .catch((e) => {
                if (typeof lastRes === 'undefined') {
                    setServerNotResponding(true);
                    throw new Error(e);
                }

                if (lastRes.status === 401) {
                    setVerificationSuccessful(false);
                    throw new Error('Verification code invalid or user not found');
                }
            })
            .finally(() => setLoading(false));
    }, [])

    return (
        <PageWrapper>

            <span className={'px-8 my-16 font-bold text-xl'}>
                {!loading && queryMissing &&
                    'A verification link has been sent to your email.'}
                {!loading && verificationSuccessful &&
                    'Verification successful. Please sign in.'}
                {!loading && serverNotResponding &&
                    'Server not responding. Try again later.'}
                {!loading && !verificationSuccessful && !serverNotResponding && !queryMissing &&
                    'Verification code invalid or user not found.'}
            </span>

        </PageWrapper>
    )
}

export default EmailVerificationPage;