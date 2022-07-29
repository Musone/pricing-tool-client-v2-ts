import {useEffect, useState} from "react";
import useHttpRequest, {IHttpReqObj} from "./useHttpRequest";
import {GET_FILTERS_URL} from "../constants/urls";

export let PRONOUN_LIST = [];
export let GENDER_LIST = [];
export let SPECS_LIST = [];
export let CREDS_LIST = [];
export let LANG_LIST = [];
export let APPROACH_LIST = [];

const useGetFilters = () => {
    const {
        isLoading,
        isError,
        data,
        res,
    } = useHttpRequest(GET_FILTERS_URL);

    const [isWaitingForFilters, setIsWaitingForFilters] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            PRONOUN_LIST = data.pronounsConstants;
            GENDER_LIST = data.genderConstants;
            SPECS_LIST = data.specializationFilters;
            CREDS_LIST = data.credentialFilters;
            LANG_LIST = data.languageFilters;
            APPROACH_LIST = data.approachFilters;
            setIsWaitingForFilters(false);
        }
    }, [isLoading])

    return {
        isWaitingForFilters,
        isError,
        data,
        res,
    };
}

export default useGetFilters;