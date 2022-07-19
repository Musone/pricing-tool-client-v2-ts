import ProvinceAndCity from "../interfaces/ProvinceAndCity";
import Dropdown from "./Dropdown";
import PROVINCES_DUMBY_LIST from "../constants/Provinces";
import React from "react";

export default function InPersonFilters(props: {
    className?: string,
    hideWhenDisabled?: boolean,
    label?: string,
    inPerson: { checked: boolean; data: ProvinceAndCity },
    onChange: () => void,
    parentQuery: (val: ProvinceAndCity) => void,
    parentQuery1: (val: ProvinceAndCity) => void
}) {
    return <>
        {/*IN PERSON*/}
        <div
            className={`bg-offWhite flex flex-col justify-start w-fit h-fit p-5 gap-3 rounded ${props.className}`}>
            <div className={"flex flex-col w-fit items-start"}>
                <label htmlFor={"inPerson-input-checkbox"}>{typeof props.label !== 'undefined' ? props.label : 'In Person Booking'}</label>
                <input id={"inPerson-input-checkbox"} type={"checkbox"}
                       checked={props.inPerson.checked}
                       className={"accent-primary_main"} onChange={props.onChange}
                />
            </div>

            <div
                className={`${props.hideWhenDisabled ? `${props.inPerson.checked ? 'visible' : 'hidden'}` : ''} flex flex-wrap gap-4 p-3 border-2 rounded ${props.inPerson.checked ? "" : "bg-offWhite brightness-75 disabled"}`}>
                <div className={"flex flex-col"}>
                    <label htmlFor={""}>Province</label>

                    <div className={""}>
                        <Dropdown noChoose={true}
                                  disabled={!props.inPerson.checked}
                                  filterLabel={"province"}
                                  filterList={Object.keys(PROVINCES_DUMBY_LIST)}
                                  parentQuery={props.inPerson.data}
                                  setParentQuery={props.parentQuery}/>
                    </div>
                </div>

                <div className={"flex flex-col"}>
                    <label htmlFor={""}>City</label>

                    <div className={""}>
                        <Dropdown
                            noChoose={true}
                            value={props.inPerson.data.city}
                            disabled={!props.inPerson.checked}
                            filterLabel={"city"}
                            filterList={PROVINCES_DUMBY_LIST[props.inPerson.data.province as keyof typeof PROVINCES_DUMBY_LIST]}
                            parentQuery={props.inPerson.data}
                            setParentQuery={props.parentQuery1}/>
                    </div>
                </div>
            </div>
        </div>
    </>;
}