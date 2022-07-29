import {FunctionComponent, ReactNode} from "react";


const PageWrapper: FunctionComponent<{ children: ReactNode }> = ({children}) => {


    return (
        <div className={"relative w-screen flex flex-col items-center mb-96"}>
            {children}
        </div>
    )
}

export default PageWrapper;