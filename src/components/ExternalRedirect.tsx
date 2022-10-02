import {FunctionComponent, useEffect} from "react";


const ExternalRedirect: FunctionComponent<{redirectLink:string}> = ({redirectLink}) => {
    useEffect(() => {
        window.location.href = redirectLink;
    }, [])

    return <span>redirecting to <a className={'text-blue-500 hover:text-blue-800 underline underline-offset-auto'} href={redirectLink}>{redirectLink}</a>...</span>
}

export default ExternalRedirect;