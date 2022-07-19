import React, {FunctionComponent, ReactElement} from "react";


const PrimaryButton_1: FunctionComponent<{loading?: boolean, text: string, callBack?: CallableFunction, type?: "button" | "reset" | "submit" | undefined}> = ({loading, text, callBack, type}): ReactElement => {
    return (
        <button
            disabled={loading}
            className={`disabled:cursor-not-allowed mx-1 bg-white hover:bg-gray-100 text-primary_main font-semibold py-2 px-4 border border-primary_main rounded shadow`}
            type={type}
            onClick={() => {
                if (typeof callBack !== 'undefined') {
                    callBack();
                }
            }}
        >
            {text}
        </button>
    )
}

export default PrimaryButton_1;