import React, {Dispatch, FunctionComponent, ReactElement, SetStateAction, useEffect, useState} from "react";
import capitalize from "../../utils/capitalize";
import PrimaryButton_1 from "../buttons/PrimaryButton_1";
import PrimaryButton_2 from "../buttons/PrimaryButton_2";
import ICounselor from "../lists/interfaces/ICounselor";
import isNullOrUndefined from "../../utils/isNullOrUndefined";
import {Link} from "react-router-dom";
import isEmptyString from "../../utils/isEmptyString";

const CounselorCardDropdown: FunctionComponent<{ counselor: ICounselor, toggleTriggerState: [any, Dispatch<SetStateAction<any>>] }>
    = ({counselor, toggleTriggerState: [toggleTrigger, setToggleTrigger]}): ReactElement => {

    const [maxHeight, setMaxHeight] = useState('max-h-0 duration-[2000ms]');
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);


    /**
     * Animates the drop-down opening.
     */
    useEffect(() => {
        setTimeout(() => {
            if (isMounted) {

                if (isOpen) {
                    setMaxHeight('max-h-0 duration-[500ms]')
                } else {
                    setMaxHeight('max-h-[9999px] duration-[2000ms]');
                }

                setIsOpen(!isOpen);
            } else {
                setIsMounted(true);
            }
        }, 50);
    }, [toggleTrigger])


    /**
     * Animates the drop-down closing.
     */
    function handleCloseDropdown() {
        setToggleTrigger(!toggleTrigger);
    }

    return (
        <div className={`flex justify-center w-full overflow-hidden ease-in-out transition-[max-height] ${maxHeight}`}>
            <div
                className={`h-fit py-5 flex flex-col self-center items-start px-8 w-[99%] border-x-2 border-b-2 border-offWhiteOutline bg-offWhite rounded-b gap-5`}>

                {(counselor.specializations.length > 0 || counselor.approach.length > 0) &&
                    <div className={'flex flex-col w-full'}>
                        <span className={'text-lg font-semibold'}>Treatment Areas</span>
                        <div className={'flex flex-wrap w-full gap-5'}>
                            {counselor.specializations.length > 0 &&
                                <div>
                                    <ul
                                        className={' list-disc list-inside px-7 w-fit rounded-lg py-1 bg-white border-2 border-secondary_4'}>
                                        <label className={'text-secondary_4 font-bold'}>Specializations</label>
                                        {counselor.specializations.map((spec, i) => <li key={i}
                                                                                        className={'text-secondary_4 font-semibold'}>{capitalize(spec.replaceAll('_', ' '))}</li>)}
                                    </ul>
                                </div>
                            }
                            {counselor.approach.length > 0 &&
                                <div>
                                    <ul
                                        className={' list-disc list-inside px-7 w-fit rounded-lg py-1 bg-white border-2 border-secondary_2'}>
                                        <label className={'text-secondary_2 font-bold'}>Approaches</label>
                                        {counselor.approach.map((spec, i) => <li key={i}
                                                                                 className={'text-secondary_2 font-semibold'}>{capitalize(spec.replaceAll('_', ' '))}</li>)}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }

                <div className={'flex flex-col w-full'}>
                    <span
                        className={'text-lg font-semibold'}>An introduction to {capitalize(counselor.firstName) + ' ' + capitalize(counselor.lastName)}</span>
                    <span>{counselor.introduction}</span>
                </div>


                <div className={'flex flex-col w-full'}>
                    <span className={'text-lg bg-pinka-600 font-semibold'}>Therapy Approach</span>
                    <span>{counselor.approachDesc}</span>
                </div>


                <div className={'flex flex-row'}>
                    <PrimaryButton_1 text={'Close profile'} callBack={() => handleCloseDropdown()}/>
                    {!isNullOrUndefined(counselor.janeId) && !isEmptyString(counselor.janeId) ? (
                            <a href={`https://phare.janeapp.com/#/staff_member/${counselor.janeId}`}>
                                <PrimaryButton_2 text={"Book a free consultation"}/>
                            </a>)
                        :
                        (<PrimaryButton_2 text={"Booking unavailable"} loading={true}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default CounselorCardDropdown;