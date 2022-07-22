import React, {FunctionComponent, ReactElement} from "react";


const PrimaryButton_2: FunctionComponent<{ loading?: boolean, text: string, callBack?: CallableFunction, type?: "reset" | "submit" | "button" | undefined }>
    = ({text, loading, callBack, type}): ReactElement => {

    return (
        <button
            disabled={loading}
            type={type}
            className={`disabled:cursor-not-allowed mx-1 bg-primary_main hover:bg-primary_main/90 text-neutral-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
            onClick={(e) => typeof callBack !== 'undefined' ? callBack(e) : ''}>
            {text}
        </button>
    )
}

export default PrimaryButton_2;