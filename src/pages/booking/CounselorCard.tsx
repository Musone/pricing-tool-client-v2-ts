import React, {Fragment, FunctionComponent, ReactElement, useEffect, useState} from 'react';
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import Counselor from "../../interfaces/Counselor";
import TagComponent from "../../components/TagComponent";
import capitalize from "../../hooks/capitalize";
import CounselorCardDropdown from "./CounselorCardDropdown";
import config from "../../config/config";


const CounselorCard: FunctionComponent<{ counselorData: Counselor, lookingForcounselor: boolean, lookingForSupervisor: boolean }>
    = ({counselorData, lookingForcounselor, lookingForSupervisor}): ReactElement => {
    const {
        user,
        firstName,
        lastName,
        gender,
        age,
        pronouns,
        in_person,
        languages,
        specializations,
        specializationDesc,
        approach,
        approachDesc,
        credentials,
        pfp,
        descriptionLong,
        introduction,
        janeId,
        counselling,
        supervising,
    } = counselorData;

    const [displayDropdown, setDisplayDropdown] = useState(false);

    function trimParagraph(paragraph: string): string {
        const maxLength = 650;
        return paragraph.length > maxLength
            ? paragraph.slice(0, maxLength) + "..."
            : paragraph;
    }

    return (
        <div className={'flex flex-col items-center h-fit w-full max-w-screen-xl my-3 break-words'}>
            <div
                className={"flex flex-col w-full min-h-[395px] lg:flex-row border-2 border-offWhiteOutline bg-offWhite shadow-lg rounded-lg px-1 py-1 break-words overflow-hidden"}>


                <img id={'pfp'}
                     className={"object-cover lg:self-center bg-blue-200 max-w-sm lg:min-w-[385px] h-full max-h-[394px] rounded-md"}
                     src={`${config.serverUrl}/${counselorData.pfp}`} onError={({currentTarget}) => {
                    currentTarget.onerror = null; // prevents looping
                    let tester = new Image();
                    tester.onload = () => currentTarget.src = counselorData.pfp;
                    tester.onerror = () => currentTarget.src = `https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg`;
                    tester.src = counselorData.pfp;
                }} alt={pfp}/>

                <div id={'name credentials pronouns descriptionLong'}
                     className={"flex flex-col justify-between px-2.5 pb-1 grow min-h-fit break-words"}>
                    <div className={"flex flex-col h-fit mb-1 break-words"}>
                    <span
                        className={"text-2xl font-bold my-1.5"}>{capitalize(firstName) + ' ' + capitalize(lastName)}</span>
                        <div className={"flex flex-wrap mb-2"}>
                            {credentials && credentials.map((v, i) => <TagComponent key={i} inputText={v}/>)}
                        </div>
                        <span className={"text-xs text-muted"}>{pronouns}</span>
                        <span className={'break-words'}>{trimParagraph(descriptionLong)}</span>
                    </div>


                    <div id={'languages price buttons'} className={"flex flex-col h-fit items-start font-semibold"}>
                        <span className={"mb-1"}>
                            Languages:{' '}
                            {languages.join(', ')}
                        </span>

                        <div className={'h-0.5 w-full max-w-sm bg-offWhiteOutline my-1'}/>

                        <div className={'flex flex-col mb-3'}>
                            {lookingForSupervisor &&
                                <span className={''}>Max Occupancy: {(supervising) ? supervising.occupancy : 'unavailable'}</span>
                            }

                            <span className={''}>Cost per session: ${
                                lookingForcounselor ? ((counselling) ? counselling.minPrice : 'unavailable') : ((lookingForSupervisor && supervising) ? supervising.minPrice : 'unavailable')
                            }</span>
                        </div>

                        <div className={"flex flex-row justify-start"}>
                            <PrimaryButton_1 text={"View profile"}
                                             callBack={() => setDisplayDropdown(true)}/>
                            <PrimaryButton_2 text={"Book a free consultation"} callBack={() => {
                                return
                            }}/>
                        </div>
                    </div>
                </div>
            </div>

            {displayDropdown &&
                <CounselorCardDropdown firstNAme={firstName}
                                       lastName={lastName}
                                       introduction={introduction}
                                       specializations={specializations}
                                       approachDescription={approachDesc}
                                       approach={approach}
                                       closeProfileCallback={() => setDisplayDropdown(false)}
                />
            }
        </div>
    );
}


export default CounselorCard;

/*
<Fragment>
            <div
                className={"flex flex-col lg:flex-row w-full max-w-screen-xl border-2 border-offWhiteOutline bg-offWhite shadow-lg rounded-lg mt-3 px-1 py-1 overflow-hidden break-words"}>

                <img id={'pfp'} className={"object-cover bg-blue-200 max-w-sm max-h-full rounded-md"}
                     src={"https://imgflip.com/s/meme/Doge.jpg"} alt={"PFP"}/>

                <div id={'name credentials pronouns descriptionLong'}
                     className={"flex flex-col justify-between px-2.5 pb-1 w-full h-full min-h-fit"}>
                    <div className={"flex flex-col h-fit mb-1"}>
                    <span
                        className={"text-2xl font-bold my-1.5"}>{capitalize(counselorData.firstName) + ' ' + capitalize(counselorData.lastName)}</span>
                        <div className={"flex flex-wrap mb-2"}>
                            {credentials && credentials.map((v, i) => <TagComponent key={i} inputText={v}/>)}
                        </div>
                        <span className={"text-xs text-muted"}>{pronouns}</span>

                        <span
                            className={"overflow-hidden text-ellipsis"}>{trimParagraph(descriptionLong)}</span>
                    </div>


                    <div id={'languages price buttons'} className={"flex flex-col h-fit items-start font-semibold"}>
                    <span
                        className={"mb-1"}>
                        Languages:{' '}
                        {
                            counselorData.languages.map((lang, i: number) => {
                                if (i === 0) return lang;
                                return `, ${lang}`;
                            })}
                    </span>

                        <span className={"mb-3"}>Price: ${
                            counsellingProp ? counselorData.counselling?.minPrice : (supervisingProp ? counselorData.supervising?.minPrice : 'unavailable')
                        }</span>

                        <div className={"flex flex-row justify-start"}>
                            <PrimaryButton_1 text={"View profile"}
                                             callBack={() => setDisplayDrowpdown(!displayDrowpdown)}/>
                            <PrimaryButton_2 text={"Book a free consultation"} callBack={() => {
                                return
                            }}/>
                        </div>
                    </div>

                </div>
            </div>

            {displayDrowpdown &&
                <CounselorCardDropdown firstNAme={firstName}
                                       lastName={lastName}
                                       introduction={introduction}
                                       specializations={specializations}
                                       approachDescription={approachDesc}/>
            }
        </Fragment>

*/