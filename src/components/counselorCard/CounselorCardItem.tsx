import React, {FunctionComponent, ReactElement, useState} from 'react';
import ICounselor from "../../interfaces/ICounselor";
import CounselorCardDropdown from "./CounselorCardDropdown";
import {CounselorCardTopPane} from "./CounselorCardTopPane";

const CounselorCardItem: FunctionComponent<{ counselor: ICounselor }>
    = ({counselor}): ReactElement => {

    const [toggleTrigger, setToggleTrigger] = useState<boolean>(false);

    return (
        <div className={'w-full'}>
            <CounselorCardTopPane counselor={counselor} toggleTriggerState={[toggleTrigger, setToggleTrigger]} />
            <CounselorCardDropdown counselor={counselor} toggleTriggerState={[toggleTrigger, setToggleTrigger]} />
        </div>
    );
}


export default CounselorCardItem;