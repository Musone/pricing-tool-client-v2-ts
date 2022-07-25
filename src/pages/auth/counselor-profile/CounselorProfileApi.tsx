import useHttpRequest from "../../../hooks/useHttpRequest";
import {COUNSELOR_ME_URL, COUNSELOR_URL} from "../../../constants/urls";
import config from "../../../config/config";
import {FunctionComponent, useContext} from "react";
import UserContext from "../../../contexts/UserContext";
import CounselorProfileLogic from "./CounselorProfileLogic";
import {IPutCounselorForm} from "./PutCounselorFormSchema";
import Spinner from "../../../components/Spinner";

const CounselorProfileApi: FunctionComponent<{setSpinner: (isLoading: boolean) => void}> = ({setSpinner}) => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [userContext, setUserContext] = useContext(UserContext);
    const {isLoading, data, isError, res} = useHttpRequest(COUNSELOR_ME_URL, {
        headers: {
            authorization: accessToken ?? '',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const handleSubmit = async (submitData: IPutCounselorForm) => {
        const body: Partial<IPutCounselorForm> = {};

        Object.entries(submitData).forEach(([k, v]) => {
            let key = k as keyof IPutCounselorForm;

            if (submitData[key] !== data[key]) {
                body[key] = v as never;
            }
        })

        if (typeof submitData.janeId === 'string') {
            body.janeId = null;
        }
        console.log({body})

        return fetch(`${COUNSELOR_URL}/${userContext?._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken ?? '',
            },
            body: JSON.stringify(body)
        })
    }

    if (isLoading) return <div className={'flex justify-center w-full'}><Spinner/></div>

    const defaultValues: IPutCounselorForm = {
        age: data?.age ?? '',
        gender: data?.gender ?? '',
        pronouns: data?.pronouns ?? [],
        languages: data?.languages ?? [],
        specializations: data?.specializations ?? [],
        approach: data?.approach ?? [],
        credentials: data?.credentials ?? [],
        pfp: data?.pfp ?? null,
        approachDesc: data?.approachDesc ?? '',
        descriptionLong: data?.descriptionLong ?? '',
        introduction: data?.introduction ?? '',
        janeId: data?.janeId ?? '',
        in_person: data?.in_person ?? null,
        counselling: data?.counselling ?? null,
        supervising: data?.supervising ?? null,
    }

    return (
        <CounselorProfileLogic setSpinner={setSpinner} defaultPreviewData={data} defaultValues={defaultValues} onSubmit={handleSubmit}/>
    )
}

export default CounselorProfileApi;