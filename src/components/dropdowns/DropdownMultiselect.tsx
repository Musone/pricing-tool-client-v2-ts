import React, {MouseEvent, ChangeEvent, FunctionComponent, useEffect, useState, useRef} from "react";
import Tag from "../Tag";
import {QueryParamObj} from "../../pages/booking/FindACounselorPage";
import capitalize from "../../utils/capitalize";
import {lastFocusedElement} from "../../App";


const DropdownMultiselect: FunctionComponent<{
    idProp?: string,
    filterLabel: string,
    filtersList: string[],
    parentQuery: Object,
    setParentQuery: CallableFunction,
    trigger?: boolean,
}> = ({trigger, idProp, filterLabel, filtersList, parentQuery, setParentQuery}, props) => {
    const base64ArrowDownIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABBElEQVRoge2YSw6CMBRFb0LdgGsQVswYJzrwsza3oANp8iD0A7Z9Ve9JOhHbdw5MUIAQQggh5H9pHJ93APYAHgVdfKzy6QE8xzUAMPm8ghgAR+HThzZ04st2XaATYcbZc5/Wt6ld2KAR4ZIPBgDTR6YR4ZMfYg5oAJwcB9wA7JIrT2efPbOjb6BGRDJ5eWCpiOTy8uDcEdnk5YBcEdnl5SBXxB3bIorJy4GpIorLy8GfRqjJS4GtEeryUmRtRDXyUig2ojp5KRaKqFbe4nv5uo5r6ZrWa/oividR7Z2fExtRpbwlFFG1vMUV8RXyFoP3rycrr/3nwGZaAAdtCUIIIYSQX+UFQeDzn63gka4AAAAASUVORK5CYII=';
    const [search, setSearch] = useState('');
    const dropDownRef = useRef<HTMLDivElement>(null);
    const cRef = useRef<HTMLDivElement>(null);


    /**
     * Queried filters are the filters that display after using the search box.
     * Selected filters are the filters that have been chosen by the user.
     */
    const [queriedFilters, setQueriedFilters] = useState<string[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    useEffect(() => {
        let temp = [...filtersList];
        temp = temp.filter((name) => !selectedFilters.includes(name));
        setQueriedFilters(temp);
    }, [selectedFilters])

    /**
     * On mount, display pre-selected filters.
     */
    useEffect(() => {
        const {key} = checkForError('null', {...parentQuery});
        let temp = [...selectedFilters];
        if (parentQuery[key] === null) {
            return;
        }

        (parentQuery[key] as unknown as string[]).forEach((filter) => {
            if (filtersList.includes(filter)) {
                temp.push(filter)
            }
        });

        setSelectedFilters(temp);
    }, [trigger])

    function checkForError(filterValue: string, parentQueryCopy: any) {
        const isValidLabel = Object.keys(parentQuery).includes(filterLabel);
        const isSelected = selectedFilters.includes(filterValue);
        const key = filterLabel as keyof typeof parentQuery;

        if (!isValidLabel) {
            throw new Error('The drop-down menu that you are trying to select from has a filter label that does not ' +
                'match any of the counselor querying keys. This filter box has an invalid label and none of the filters ' +
                'will be applied');
        } else if (parentQueryCopy[key] !== null && !Array.isArray(parentQueryCopy[key])) {
            throw new Error('Drop down Multiselect is being used by a query parameter that does not take an array of ' +
                'filters. This component should only be used for query parameters that can have multiple filters ' +
                'selected at once');
        } else if (parentQueryCopy[key] === null && isSelected) {
            throw new Error('An error occured where a filter was selected, but the associated query parameter ' +
                '(parentQuery) does not contain any filters');
        }
        return {isSelected, key};
    }

    /**
     * The callback for clicking on filters in the filter drop-down.
     * This function should add/remove the clicked filter to the 'selectedFilters',
     * and also update the parent-page-component's query state.
     *
     * This function will throw an error if the filter label is an invalid query parameter, or if the query parameter
     * can only take a single value.
     * @param e
     * @param filterValue
     */
    function handleFilterOnClick(filterValue: string, e?: MouseEvent<HTMLLIElement>) {
        let parentQueryCopy: any = {...parentQuery};
        const {isSelected, key} = checkForError(filterValue, parentQueryCopy);

        if (isSelected) { // we can assume that the associated value is an array if the previous checks passed
            (parentQueryCopy[key] as string[]) =
                (parentQueryCopy[key] as string[]).filter((v) => v !== filterValue);

            if ((parentQueryCopy[key] as string[]).length < 1)
                parentQueryCopy[key] = null;

            setParentQuery(parentQueryCopy);
            setSelectedFilters(selectedFilters.filter((v) => v !== filterValue));
        } else {
            let temp = [...selectedFilters];

            if (parentQueryCopy[key] === null) {
                (parentQueryCopy[key] as string[]) = [filterValue];
            } else {
                (parentQueryCopy[key] as string[]).push(filterValue);
            }

            temp.push(filterValue);
            setSelectedFilters(temp);
        }
        setParentQuery(parentQueryCopy);
    }

    /**
     * Updates queried filter results when you type into the search-box.
     * Queried filters are the ones that are displayed in the drop-down. They should not be mistaken with
     * 'selectedFilters' which are the ones that are displayed as tags inside the filter box.
     */
    useEffect(() => {
        let temp = [...filtersList];
        temp = temp.filter((name) => name.toLowerCase().includes(search.toLowerCase()));
        setQueriedFilters(temp);
    }, [search])


    /**
     * If the dropdown menu was not the last focused HTML element, Focuses the dropdown menu (revealing it on the screen).
     * Otherwise, ignores the click: causing the the dropdown menu to become unfocused.
     */
    function handleButtonOnClick() {
        if (dropDownRef !== null && lastFocusedElement !== dropDownRef.current) {
            dropDownRef.current?.focus();
        }
    }


    return (
        <div id={idProp}
             className={"w-64 h-fit border border-secondary_1 rounded-md overflow-hidden"}
             onClick={handleButtonOnClick}
        >

            <div
                className={"w-full h-fit p-3 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer hover:bg-neutral-50"}>

                <div className={'flex flex-wrap grow overflow-hidden'}>
                    {selectedFilters.length > 0 ?
                        selectedFilters.map((filterName: string, i) => <Tag callBack={() => {
                            handleFilterOnClick(filterName);
                            window.focus();
                        }}
                                                                            closable={true} key={i} inputText={filterName}
                                                                            customColour={'border-secondary_4 bg-secondary_4/10 text-secondary_4'}/>)
                        : <span className={'text-secondary_1 brightness-[.78] h-4'}>{
                            'Select'
                            + (filterLabel.toLowerCase().endsWith('s') ? ' ' : ' a')
                            + ((['a', 'e', 'i', 'o', 'u'].filter((v) => filterLabel.toLowerCase().startsWith(v)).length < 1 ? ' ' : 'n '))
                            + capitalize(filterLabel)}</span>
                    }
                </div>
                <img src={base64ArrowDownIcon} className={'w-4'} alt={'V'}/>
            </div>

            <div id={'dropDownMenu'} ref={dropDownRef} tabIndex={0}
                 className={'absolute overflow-hidden h-0 rounded focus-within:h-fit z-10 outline-none'}>
                <div
                    className={'rounded bg-offWhite z-10 border-2 border-neutral-400 overflow-hidden'}>

                    <div id={'dropdownSearch'} className={'my-0.5 px-1 py-2 flex justify-center'}>
                        <input
                            type="search"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            className={"form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding " +
                                "border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondary_1/50 focus:outline-none"}
                            id="searchBox"
                            placeholder="Search"
                        />
                    </div>
                    <hr/>

                    <div className={'h-fit max-h-96 overflow-auto'}>
                        <ul>
                            {queriedFilters.map((filterValue, i) =>
                                <li key={i}
                                    className={'hover:cursor-pointer p-1.5 ahover:bg-blue-100/50 hover:bg-secondary_1/10'}
                                    onClick={(e: MouseEvent<HTMLLIElement>) => handleFilterOnClick(filterValue)}>
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

export default DropdownMultiselect;