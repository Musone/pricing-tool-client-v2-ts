import CounselorProfileView from "./CounselorProfileView";
import {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {object, string} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {IPutCounselorForm, PutCounselorFormSchema} from "./PutCounselorFormSchema";
import config from "../../../config/config";
import ICounselor from "../../../components/lists/interfaces/ICounselor";

export enum ServerError {
    NOT_RESPONDING='NOT_RESPONDING',
    BAD_REQUEST='BAD_REQUEST',
}

const CounselorProfileLogic: FunctionComponent<{
    defaultValues: IPutCounselorForm,
    onSubmit: (data: IPutCounselorForm) => Promise<Response>,
    defaultPreviewData: ICounselor | null,
    setSpinner: (isLoading: boolean) => void,
}> = ({setSpinner, defaultValues, onSubmit, defaultPreviewData}) => {
    const [serverError, setServerError] = useState<ServerError | null>(null)

    const form = useForm<IPutCounselorForm>({
        mode: 'onSubmit',
        defaultValues,
        resolver: zodResolver(PutCounselorFormSchema),
    })
    const {isSubmitting} = form.formState

    useEffect(() => setSpinner(isSubmitting), [isSubmitting])

    /*
    const fileSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        const myFile = e.target.files[0];
        let fileReader = new FileReader();

        fileReader.onload = (loadEvent) => {
            let base64img = loadEvent.target?.result;
            let temp = {...form};
            temp.pfp = base64img as string;
            updateFormAndPreview(temp.pfp, 'pfp');
        }
        fileReader.readAsDataURL(myFile);
    }*/

    const handleSubmit = async (data: IPutCounselorForm) => {
        setServerError(null);

        await onSubmit(data)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem(config.localStorageAccessTokenKey);
                    window.history.go();
                } else if (res.status === 400) {
                    setServerError(ServerError.BAD_REQUEST);
                }
            })
            .catch((err) => {
                setServerError(ServerError.NOT_RESPONDING);
                console.error(err);
            })
    }

    const handleNumberInput = (formKey: keyof IPutCounselorForm, val: string) => {
        if (val.length > 0 && isNaN(parseInt(val))) {
            return form.getValues(formKey) as number | string;
        } else if (val.length < 1) {
            return '';
        } else {
            return parseInt(val)
        }
    }

    return (
        <CounselorProfileView handleNumberInput={handleNumberInput} defaultPreviewData={defaultPreviewData} serverError={serverError} form={form} onSubmit={handleSubmit} />
    )
}


export default CounselorProfileLogic;