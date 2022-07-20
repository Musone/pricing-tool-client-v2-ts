import React, {ChangeEvent, FunctionComponent, MouseEvent, useEffect, useRef, useState} from "react";
import {lastFocusedElement} from "../App";
import TagComponent from "./TagComponent";
import capitalize from "../hooks/capitalize";


const dropdown: FunctionComponent<{ noChoose?:boolean, value?: string, disabled?: boolean, filterLabel: string, filterList: string[], parentQuery: Object, setParentQuery: CallableFunction, trigger?: boolean }>
    = ({
            noChoose,
           disabled,
           filterLabel,
           filterList,
           parentQuery,
           setParentQuery,
           value,
    trigger
       }) => {
    const base64ArrowDownIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABBElEQVRoge2YSw6CMBRFb0LdgGsQVswYJzrwsza3oANp8iD0A7Z9Ve9JOhHbdw5MUIAQQggh5H9pHJ93APYAHgVdfKzy6QE8xzUAMPm8ghgAR+HThzZ04st2XaATYcbZc5/Wt6ld2KAR4ZIPBgDTR6YR4ZMfYg5oAJwcB9wA7JIrT2efPbOjb6BGRDJ5eWCpiOTy8uDcEdnk5YBcEdnl5SBXxB3bIorJy4GpIorLy8GfRqjJS4GtEeryUmRtRDXyUig2ojp5KRaKqFbe4nv5uo5r6ZrWa/oividR7Z2fExtRpbwlFFG1vMUV8RXyFoP3rycrr/3nwGZaAAdtCUIIIYSQX+UFQeDzn63gka4AAAAASUVORK5CYII=';
    const dropDownRef = useRef<HTMLDivElement>(null);
    const NONE_SELECTED = 'Choose';

    const [selected, setSelected] = useState(NONE_SELECTED);

    useEffect(() => {
        if (typeof value !== 'undefined' && value !== selected) {
            setSelected(value);
        }
    }, [value])

    /**
     * On mount, display pre-selected filters.
     */
    useEffect(() => {
        const key = checkForError();
        if (parentQuery[key] === null) {
            return;
        }

        setSelected(parentQuery[key] as unknown as string);
    }, [trigger])

    function checkForError() {
        const isValidLabel = Object.keys(parentQuery).includes(filterLabel);
        const key = filterLabel as keyof typeof parentQuery;

        if (!isValidLabel) {
            throw new Error('The drop-down menu that you are trying to select from has a filter label that does not ' +
                'match any of the counselor querying keys. This filter box has an invalid label and none of the filters ' +
                'will be applied');
        }

        return key;
    }

    function handleFilterOnClick(e: MouseEvent<HTMLLIElement>, filterValue: string) {
        const key = checkForError();
        let temp = {...parentQuery};

        if ((typeof noChoose === 'undefined' || !noChoose) && filterValue === NONE_SELECTED) {
            temp[key] = null as never;
        } else {
            temp[key] = filterValue as never;
        }
        setParentQuery(temp);
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
    )
}

export default dropdown;