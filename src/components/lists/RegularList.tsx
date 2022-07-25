import React, {FunctionComponent, ReactElement} from 'react';
import CounselorItem from "./interfaces/ICounselor";

const RegularList: FunctionComponent<{ itemList: CounselorItem[], resourceName: 'counselor', itemComponent: FunctionComponent<any>/*, counsellingProp: boolean, supervisingProp: boolean*/ }>
    = ({itemList, resourceName, itemComponent: ItemComponent/*, counsellingProp, supervisingProp*/}): ReactElement => {

    return (
        <div className={"flex flex-col items-center w-3/4 h-fit pb-20 gap-3 max-w-screen-xl mb-20"}>
            {itemList.map((item: CounselorItem, i: number) => <ItemComponent key={i} {...{[resourceName]: item}} />)}
        </div>
    );
}

export default RegularList;