

import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import isNullOrUndefined from "../../utils/isNullOrUndefined";


const TextInput: FunctionComponent<{
    label?: string,
    id: string,
    value?: string,
    setForm?: CallableFunction,
    register?: any,
    disabled?: boolean,
    err?: any,
    placeholder?: string,
}> = ({err, disabled, setForm = () => null, label, id, value, register, placeholder}) => {

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(event.target.value);
    }

    return (
        <div className={'flex flex-col'}>
            {!isNullOrUndefined(label) && <label className={'font-semibold focus:outline-0'} htmlFor={id}>{label}</label>}
            <input
                placeholder={placeholder}
                disabled={disabled}
                className={`${disabled ? 'hover:cursor-not-allowed' : ''} outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded`}
                id={id}
                type={'text'}
                value={value}
                onChange={handleOnChange}
                {...register}
            />
            {err && <span className={'ml-1.5 text-xs text-red-600'}>{err.message}</span>}
        </div>
    )
}

export default TextInput;