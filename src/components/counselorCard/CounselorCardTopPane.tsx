import React, {Dispatch, FunctionComponent, SetStateAction, useContext} from "react";
import ICounselor from "../lists/interfaces/ICounselor";
import config from "../../config/config";
import capitalize from "../../utils/capitalize";
import Tag from "../Tag";
import trimParagraph from "../../utils/trimParagraph";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import DisplayType from "../../enums/DisplayType";
import CardDisplayTypeContext from "../../contexts/CardDisplayTypeContext";

export const CounselorCardTopPane: FunctionComponent<{ counselor: ICounselor, toggleTriggerState: [any, Dispatch<SetStateAction<any>>] }>
    = ({counselor, toggleTriggerState: [toggleTrigger, setToggleTrigger]}) => {

    const [cardDisplayTypeContext, setDisplayTypeContext] = useContext(CardDisplayTypeContext);
    const lookingForcounselor = cardDisplayTypeContext === DisplayType.Counselor;
    const lookingForSupervisor = cardDisplayTypeContext === DisplayType.Supervisor;

    return (
        <div
            className={"flex flex-col w-full min-h-[395px] lg:flex-row border-2 border-offWhiteOutline bg-offWhite shadow-lg rounded-lg px-1 py-1 break-words overflow-hidden"}>


            <img id={'pfp'}
                 className={"object-cover lg:self-center bg-blue-200 max-w-sm lg:min-w-[385px] h-full max-h-[394px] rounded-md"}
                 src={`${config.serverUrl}/${counselor.pfp}`} onError={({currentTarget}) => {
                currentTarget.onerror = null; // prevents looping
                let tester = new Image();
                tester.onload = () => currentTarget.src = counselor.pfp;
                tester.onerror = () => currentTarget.src = `https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg`;
                tester.src = counselor.pfp;
            }} alt={counselor.pfp}/>

            <div id={'name credentials pronouns descriptionLong'}
                 className={"flex flex-col justify-between px-2.5 pb-1 grow min-h-fit break-words"}>
                <div className={"flex flex-col h-fit mb-1 break-words"}>
                    <span
                        className={"text-2xl font-bold my-1.5"}>{capitalize(counselor.firstName) + ' ' + capitalize(counselor.lastName)}</span>
                    <div className={"flex flex-wrap mb-2"}>
                        {counselor.credentials && counselor.credentials.map((v, i) => <Tag key={i}
                                                                                           inputText={v}/>)}
                    </div>
                    <span className={"text-xs text-muted"}>{counselor.pronouns}</span>
                    <span className={'break-words'}>{trimParagraph(counselor.descriptionLong)}</span>
                </div>


                <div id={'languages price buttons'} className={"flex flex-col h-fit items-start font-semibold"}>
                        <span className={"mb-1"}>
                            Languages:{' '}
                            {counselor.languages.join(', ')}
                        </span>

                    <div className={'h-0.5 w-full max-w-sm bg-offWhiteOutline my-1'}/>

                    <div className={'flex flex-col mb-3'}>
                        {lookingForSupervisor &&
                            <span
                                className={''}>Max Occupancy: {(counselor.supervising) ? counselor.supervising.occupancy : 'unavailable'}</span>
                        }

                        <span className={''}>Cost per session: ${
                            lookingForcounselor ? ((counselor.counselling) ? counselor.counselling.minPrice : 'unavailable') : ((lookingForSupervisor && counselor.supervising) ? counselor.supervising.minPrice : 'unavailable')
                        }</span>
                    </div>

                    <div className={"flex flex-row justify-start"}>
                        <PrimaryButton_1 text={"View profile"}
                                         callBack={() => setToggleTrigger(!toggleTrigger)}/>
                        <PrimaryButton_2 text={"Book a free consultation"} callBack={() => {
                            return
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}