import React, {
    cloneElement,
    FunctionComponent,
    ReactElement, useEffect,
    useState
} from "react";


const CheckBoxInput: FunctionComponent<{
    className?: string,
    label: string,
    id: string,
    hideWhenDisabled?: boolean,
    setForm: CallableFunction,
    children: ReactElement | ReactElement[],
    defaultChecked?: boolean,
    register?: any,
    giveSetFormToChildren?: boolean,
    err?: any,
}> = ({
          giveSetFormToChildren = true,
          id,
          defaultChecked = false,
          label,
          children,
          hideWhenDisabled,
          setForm,
          register, err, className
      }) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked);
    const childrenTranformed = Array.isArray(children) ? children : [children];

    const handleChange = () => {
        setChecked(!checked);
    }

    const formHandler = (value: any) => {
        setForm(value, checked);
    }

    useEffect(() => {
        if (!giveSetFormToChildren) {
            formHandler(undefined);
        }
    }, [checked])


    const childrenProps = {
        register: register,
        ...(giveSetFormToChildren ? {setForm: formHandler} : {}),
        disabled: !checked,
        trigger: checked
    }

    return (
        <div
            className={`${className ?? ''} bg-offWhite flex flex-col justify-start w-fit h-fit p-5 gap-3 rounded`}>
            <div className={"flex flex-col w-fit items-start"}>
                <label
                    htmlFor={id}>{typeof label !== 'undefined' ? label : 'In Person Booking'}</label>
                <input id={id}
                       type={"checkbox"}
                       checked={checked}
                       className={"accent-primary_main"} onChange={handleChange}
                />
            </div>

            <div
                className={`${hideWhenDisabled ? `${checked ? 'visible' : 'hidden'}` : ''} flex flex-wrap gap-4 p-3 border-2 rounded ${checked ? "" : "bg-offWhite brightness-75 disabled"}`}>

                {childrenTranformed.map((child, i) => cloneElement(child, {key: i, ...childrenProps}))}

            </div>
            {err && <span className={'ml-1.5 text-xs text-red-600'}>{err.message}</span>}
        </div>

    )
}

export default CheckBoxInput;