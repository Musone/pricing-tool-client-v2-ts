import {FunctionComponent, ReactElement, useEffect} from "react";
import PageWrapper from "../../components/PageWrapper";
import {logout} from "../../utils/auth";
import {bookingRoutes} from "../../constants/generalRoutes";


const LogoutPage: FunctionComponent = (): ReactElement => {
    useEffect(() => {
        logout(bookingRoutes[0].path)
    }, [])
    return (
        <PageWrapper>
            <span className={'font-semibold'}>Logging out...</span>
        </PageWrapper>
    )
}

export default LogoutPage;