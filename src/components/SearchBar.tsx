import React, {FunctionComponent, useEffect, useState} from "react";
import TextInput from "./form/TextInput";
import capitalize from "../utils/capitalize";
import isNullOrUndefined from "../utils/isNullOrUndefined";


const SearchBar: FunctionComponent<{
    objKey: string,
    list: any[],
    setList: CallableFunction,
    trigger?: any,
    placeholder?:string,
    searchLabel?: string
}> = ({ placeholder, objKey, list, setList, trigger, searchLabel}) => {
    const [originalList] = useState([...list]);
    const [value, setValue] = useState('');

    useEffect(() => {
        const filteredList = originalList.filter((obj: Object) => (obj[objKey as keyof typeof obj] as never as string).toLowerCase().includes(value.toLowerCase()));
        // console.log({filteredList})
        // console.log(originalList)
        setList(filteredList, value);
    }, [trigger, value])

    return (<span className={'flex flex-col'}>
        {!isNullOrUndefined(searchLabel) && <label className={'font-semibold focus:outline-0'}>{capitalize(searchLabel as string)}</label>}
        <TextInput placeholder={placeholder ?? 'search'} id={'search-bar'} setForm={(value: string) => setValue(value)}/>
    </span>
    );
}

export default SearchBar;