import React, {FunctionComponent, ReactElement, useEffect, useState} from 'react';
import CounselorCard from "./CounselorCard";
import YES from "../../assets/images/favicon.svg"
import Counselor from "../../interfaces/Counselor";
import useHttpRequest from "../../hooks/useHttpRequest";

const CounselorCardList: FunctionComponent<{ counselorList: Counselor[], counsellingProp: boolean, supervisingProp: boolean }>
    = ({counselorList, counsellingProp, supervisingProp}): ReactElement => {


    return (
        <div className={"flex flex-col items-center w-3/4 h-fit pb-20 break-words"}>
            {counselorList.map((stuff: Counselor, i: number) => <CounselorCard key={i} counselorData={stuff} lookingForcounselor={counsellingProp} lookingForSupervisor={supervisingProp} />)}
        </div>
    );
}

export default CounselorCardList;