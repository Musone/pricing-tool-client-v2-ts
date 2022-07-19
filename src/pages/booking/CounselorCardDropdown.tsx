import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import capitalize from "../../hooks/capitalize";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";


interface CounselorCardDropdownProps {
    firstNAme: string,
    lastName: string,
    introduction: string,
    specializations: string[],
    approachDescription: string,
    closeProfileCallback: CallableFunction,
    approach: string[],
}

const CounselorCardDropdown: FunctionComponent<CounselorCardDropdownProps>
    = ({
           firstNAme,
           lastName,
           introduction,
           specializations,
           approachDescription,
           closeProfileCallback,
           approach
       }): ReactElement => {

    const [maxHeight, setMaxHeight] = useState('max-h-0 duration-[2000ms]');

    /**
     * Animates the drop-down opening.
     */
    useEffect(() => {
        console.log({height: maxHeight})
        setTimeout(() => {
            setMaxHeight('max-h-[9999px] duration-[2000ms]');
        }, 50);
    }, [])

    /**
     * Animates the drop-down closing.
     */
    function handleCloseDropdown() {
        setMaxHeight('max-h-0 duration-[500ms]')
        setTimeout(() => {
            closeProfileCallback()
        }, 500);
    }

    return (
        <div
            className={`flex justify-center w-full overflow-hidden ease-in-out transition-[max-height] ${maxHeight}`}>


            <div
                className={`h-fit py-5 flex flex-col items-start px-8 w-[99%] border-x-2 border-b-2 border-offWhiteOutline bg-offWhite rounded-b gap-5`}>

                {(specializations.length > 0 || approach.length > 0) &&
                    <div className={'flex flex-col w-full'}>
                        <span className={'text-lg font-semibold'}>Treatment Areas</span>
                        <div className={'flex flex-wrap w-full gap-5'}>
                            {specializations.length > 0 &&
                                <div>
                                    <ul
                                        className={' list-disc list-inside px-7 w-fit rounded-lg py-1 bg-white border-2 border-secondary_4'}>
                                    <label className={'text-secondary_4 font-bold'}>Specializations</label>
                                        {specializations.map((spec, i) => <li key={i}
                                                                              className={'text-secondary_4 font-semibold'}>{capitalize(spec.replaceAll('_', ' '))}</li>)}
                                    </ul>
                                </div>
                            }
                            {approach.length > 0 &&
                                <div>
                                    <ul
                                        className={' list-disc list-inside px-7 w-fit rounded-lg py-1 bg-white border-2 border-secondary_2'}>
                                    <label className={'text-secondary_2 font-bold'}>Approaches</label>
                                        {approach.map((spec, i) => <li key={i}
                                                                       className={'text-secondary_2 font-semibold'}>{capitalize(spec.replaceAll('_', ' '))}</li>)}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }

                <div className={'flex flex-col w-full'}>
                <span
                    className={'text-lg font-semibold'}>An introduction to {capitalize(firstNAme) + ' ' + capitalize(lastName)}</span>
                    <span>{introduction}</span>
                </div>


                <div className={'flex flex-col w-full'}>
                    <span className={'text-lg bg-pinka-600 font-semibold'}>Therapy Approach</span>
                    <span>{approachDescription}</span>
                </div>


                <div className={'flex flex-row'}>
                    <PrimaryButton_1 text={'Close profile'} callBack={() => handleCloseDropdown()}/>
                    <PrimaryButton_2 text={'Book a free consultation'} callBack={() => {
                        return
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default CounselorCardDropdown;