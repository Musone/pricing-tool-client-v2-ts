import React, {FunctionComponent, useEffect, useState} from "react";
import TextInput from "./form/TextInput";
import capitalize from "../utils/capitalize";
import isNullOrUndefined from "../utils/isNullOrUndefined";


const SearchBar: FunctionComponent<{
    searchValue: string,
    setSearchValue: (s:string)=>void,
    placeholder?:string,
    searchLabel?: string
}> = ({ searchValue, setSearchValue, placeholder, searchLabel}) => {

    return (<span className={'flex flex-col'}>
        {!isNullOrUndefined(searchLabel) && <label className={'font-semibold focus:outline-0'}>{capitalize(searchLabel as string)}</label>}
        <TextInput value={searchValue} placeholder={placeholder ?? 'search'} id={'search-bar'} setForm={(value: string) => setSearchValue(value)}/>
    </span>
    );
}

export default SearchBar;