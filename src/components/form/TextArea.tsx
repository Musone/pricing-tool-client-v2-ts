import React, {FunctionComponent} from "react";


const TextArea: FunctionComponent<{
    label: string,
    register: any,
    id: string,
}>
    = ({register, label, id}) => {

    return (
        <div className={'flex flex-col w-full'}>
            <label className={'font-semibold'} htmlFor={id}>{label}</label>
            <textarea id={id}
                      className={'outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded'}
                      placeholder={label}
                      {...register}
            />
        </div>
    )
}

export default TextArea;