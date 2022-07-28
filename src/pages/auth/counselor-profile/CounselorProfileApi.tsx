import useHttpRequest from "../../../hooks/useHttpRequest";
import {COUNSELOR_ME_URL, COUNSELOR_URL} from "../../../constants/urls";
import config from "../../../config/config";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import UserContext from "../../../contexts/UserContext";
import CounselorProfileLogic from "./CounselorProfileLogic";
import {IPutCounselorForm} from "./PutCounselorFormSchema";
import Spinner from "../../../components/Spinner";

const CounselorProfileApi: FunctionComponent<{
    setSpinner: (isLoading: boolean) => void, counselorId?: string
}> = ({
          setSpinner,
          counselorId
      }) => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [userContext, setUserContext] = useContext(UserContext);
    const {
        isLoading,
        data,
        isError,
        res
    } = useHttpRequest(counselorId ? `${COUNSELOR_URL}/${counselorId}` : COUNSELOR_ME_URL, {
        headers: {
            authorization: accessToken ?? '',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const handleSubmit = async (submitData: IPutCounselorForm) => {
        const body: Partial<IPutCounselorForm> = {};
        // console.log({submitData})
        let dataCopy: any = {}

        if (data !== null) {
            dataCopy = data;
        }

        try {
            Object.entries(submitData).forEach(([k, v]) => {
                let key = k as keyof IPutCounselorForm;

                if (submitData[key] !== dataCopy[key]) {
                    body[key] = v as never;
                }
            })
        } catch (e) {
            console.error(e)
        }

        console.log({body})
        if (typeof submitData.janeId === 'string') {
            body.janeId = null;
        }

        return fetch(`${COUNSELOR_URL}/${counselorId ?? userContext?._id}`, {
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
    if (!data && res?.status !== 404) return <></>


    const defaultValues: IPutCounselorForm = {
        age: data?.age ?? '',
        gender: data?.gender ?? null,
        pronouns: data?.pronouns ?? null,
        languages: data?.languages ?? [],
        specializations: data?.specializations ?? [],
        approach: data?.approach ?? [],
        credentials: data?.credentials ?? [],
        pfp: data?.pfp ?? undefined,
        approachDesc: data?.approachDesc ?? '',
        descriptionLong: data?.descriptionLong ?? '',
        introduction: data?.introduction ?? '',
        janeId: data?.janeId ?? '',
        in_person: data?.in_person ?? null,
        counselling: data?.counselling ?? null,
        supervising: data?.supervising ?? null,
    }

    return (
        <CounselorProfileLogic setSpinner={setSpinner} defaultPreviewData={data} defaultValues={defaultValues}
                               onSubmit={handleSubmit}/>
    )
}

export default CounselorProfileApi;