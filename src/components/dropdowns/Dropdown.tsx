import React, {FunctionComponent, MouseEvent, useEffect, useRef, useState} from "react";
import useEventListener from "../../hooks/useEventListener";
import base64ArrowDownIcon from "../../constants/base64ArrowDownIcon";
import capitalize from "../../utils/capitalize";

const dropdown: FunctionComponent<{
    trigger?: any,
    noChoose?: boolean,
    value?: string,
    disabled?: boolean,
    formKey: string,
    filterList: string[],
    form: Object,
    setForm?: CallableFunction,
    err?: any,
}>
    = ({
           noChoose,
           disabled,
           formKey,
           filterList,
           form,
           setForm = (arg: any) => null,
           value,
           trigger,
           err,
       }) => {
    const dropDownRef = useRef<HTMLDivElement>(null);
    const NONE_SELECTED = 'Choose';
    const [selected, setSelected] = useState(form[formKey as keyof typeof form] as unknown as string ?? (value ?? NONE_SELECTED));

    /**
     * Stores the last focused element in a global variable. Useful for deciding whether to focus or unfocus dropdown menus.
     */
    const [lastFocusedElement, setLastFocusedElement] = useState<Element | null>(null);
    useEventListener(
        'mousedown',
        () => {
            setLastFocusedElement(document.activeElement);
        },
    );

    useEffect(() => {
        if (typeof value !== 'undefined' && value !== selected) {
            setSelected(value);
        }
    }, [value])

    function checkForError() {
        const isValidLabel = Object.keys(form).includes(formKey);
        const key = formKey as keyof typeof form;

        if (!isValidLabel) {
            throw new Error('The drop-down menu that you are trying to select from has a filter label that does not ' +
                'match any of the counselor querying keys. This filter box has an invalid label and none of the filters ' +
                'will be applied');
        }

        return key;
    }

    useEffect(() => {
        const key = checkForError();
        let temp = {...form};

        if ((typeof noChoose === 'undefined' || !noChoose) && selected === NONE_SELECTED) {
            temp[key] = null as never;
        } else {
            temp[key] = selected as never;
        }
        setForm(temp);
    }, [selected, trigger])

    function handleFilterOnClick(e: MouseEvent<HTMLLIElement>, filterValue: string) {
        setSelected(filterValue);
        dropDownRef.current?.blur();
    }

    /**
     * If the dropdown menu was not the last focused HTML element, Focuses the dropdown menu (revealing it on the screen).
     * Otherwise, ignores the click: causing the the dropdown menu to become unfocused.
     */
    function handleButtonOnClick() {
        if (dropDownRef !== null && lastFocusedElement !== dropDownRef.current && (typeof disabled === 'undefined' || !disabled)) {
            dropDownRef.current?.focus();
        }
    }

    return (
        <div className={'flex flex-col'}>
            <label className={'font-semibold focus:outline-0'}>{capitalize(formKey)}</label>
            <div className={` w-64 h-fit border border-secondary_1 rounded-md overflow-hidden`}
                 onClick={handleButtonOnClick}>
                <div
                    className={`${(typeof disabled !== undefined && disabled) ? 'hover:cursor-not-allowed' : ''} w-full h-fit p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer hover:bg-neutral-50`}>

                    <div className={'flex flex-wrap grow overflow-hidden'}>
                        <span className={'text-secondary_1 brightness-[.78] h-4'}>{selected}</span>
                    </div>
                    <img src={base64ArrowDownIcon} className={'w-4'} alt={'V'}/>
                </div>

                <div id={'dropDownMenu'} ref={dropDownRef} tabIndex={0}
                     className={'absolute overflow-hidden h-0 rounded focus-within:h-fit min-w-[180px] z-10 outline-none'}>
                    <div
                        className={'rounded bg-offWhite z-10 border-2 border-neutral-400 overflow-hidden'}>

                        <div className={'h-fit max-h-96 overflow-auto'}>
                            <ul>
                                {(typeof noChoose === 'undefined' || !noChoose) &&
                                    <li className={'hover:cursor-pointer p-1.5 ahover:bg-blue-100/50 hover:bg-secondary_1/10'}
                                        onClick={(e: MouseEvent<HTMLLIElement>) => handleFilterOnClick(e, NONE_SELECTED)}>
                                        {NONE_SELECTED}
                                    </li>}

                                {filterList.map((filterValue, i) =>
                                    <li key={i}
                                        className={'hover:cursor-pointer p-1.5 ahover:bg-blue-100/50 hover:bg-secondary_1/10'}
                                        onClick={(e: MouseEvent<HTMLLIElement>) => handleFilterOnClick(e, filterValue)}>
                                        {filterValue}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {err && <span className={'ml-1.5 text-xs text-red-600'}>{err.message}</span>}
        </div>
    )
}

export default dropdown;