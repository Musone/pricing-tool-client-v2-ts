import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";


const NumberInput: FunctionComponent<{
    label: string,
    id: string,
    value?: number | '',
    setForm?: CallableFunction,
    register?: any,
    disabled?: boolean,
    err?: any,
}> = ({err, disabled, setForm = () => null, label, id, value, register}) => {

    return (
        <div className={'flex flex-col'}>
            <label className={'font-semibold focus:outline-0'} htmlFor={id}>{label}</label>
            <input
                disabled={disabled}
                className={`${disabled ? 'hover:cursor-not-allowed' : ''} outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded`}
                id={id}
                type={'text'}
                value={value}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = parseInt(event.target.value);
                    if (event.target.value.length > 0 && isNaN(value)) {
                        return;
                    } else if (event.target.value.length < 1) {
                        setForm('');
                    } else {
                        setForm(value)
                    }
                }}
                {...register}
            />
            {err && <span className={'ml-1.5 text-xs text-red-600'}>{err.message}</span>}
        </div>
    )
}

export default NumberInput;