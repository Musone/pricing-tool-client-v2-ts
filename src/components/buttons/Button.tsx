import React, {FunctionComponent, ReactElement} from "react";


const Button: FunctionComponent<{text: string, is?: 'primary' | 'secondary', disabled?: boolean, callBack?: CallableFunction, type?: "button" | "reset" | "submit" | undefined}> = ({text, is, disabled, callBack, type}): ReactElement => {
    return (
        <button
            type={type}
            className={`mx-1 font-semibold py-2 px-4 border rounded shadow ${is === 'primary' 
                ? 'bg-primary_main hover:bg-primary_main/90 text-neutral-100 border-gray-400' 
                : 'bg-white hover:bg-gray-100 text-primary_main border-primary_main'} ${disabled ? "disabled" : ""}`}
            onClick={() => {
                if (typeof callBack !== 'undefined') {
                    callBack();
                }
            }}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button;