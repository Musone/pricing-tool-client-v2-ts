import React, {FunctionComponent, Ref} from "react";


const Tag: FunctionComponent<{ callBack?: CallableFunction, inputText: string, customColour?: string, closable?: boolean }> = ({
                                                                                                                                           callBack,
                                                                                                                                           closable,
                                                                                                                                           inputText,
                                                                                                                                           customColour
                                                                                                                                       }) => {
    return (
        <div
            className={`flex w-fit justify-between max-w-fita border ${typeof customColour !== 'undefined' ? customColour : 'border-primary_main bg-primary_main/20 text-primary_main'} text-xs font-semibold mt-1 mr-2 ${closable ? 'pl-2.5 pr-0.5' : 'px-2.5'} py-0.5 rounded`}>
            {inputText}

            {closable && <div
                onClick={() => {
                    if (typeof callBack === 'undefined') {
                        return;
                    }
                    callBack();
                }}
                className={`flex items-center rounded ${customColour ? customColour : 'border-primary_main bg-primary_main/20 text-primary_main'} ml-1 px-1 hover:brightness-50`}>
                <span className={'text-base -mt-1.5 select-none'}>x</span>
            </div>}
        </div>
    )
}
export default Tag;