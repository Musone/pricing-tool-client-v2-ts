import {FormEvent, FunctionComponent, useState} from "react";
import TextInput from "../../../components/form/TextInput";
import PrimaryButton_2 from "../../../components/buttons/PrimaryButton_2";
import {nanoid} from "nanoid";
import {GET_USERS_URL} from "../../../constants/urls";
import config from "../../../config/config";


const CreateUserComponent: FunctionComponent<{}> = () => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const password = nanoid(10);
    const email = `${nanoid(10)}@email.com`;
    const [form, setForm] = useState({
        firstName: 'firstname',
        lastName: 'lastname',
        password: password,
        passwordConfirmation: password,
        email: email,
        verified: true,
    });

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {...form};

        fetch(GET_USERS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken ?? '',
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                console.log('status:', res.status);
            })
            .catch((e: any) => {
                console.error(e);
            })
            .finally(() => history.go())
    }

    return (
        <form onSubmit={handleOnSubmit} className={'flex flex-wrap gap-3 items-end w-3/4 overflow-hidden mb-8'}>
            <TextInput label={'first name'} id={'first-name'}
                       setForm={(value: string) => setForm({...form, firstName: value})}/>
            <TextInput label={'last name'} id={'first-name'}
                       setForm={(value: string) => setForm({...form, lastName: value})}/>
            <div>
                <PrimaryButton_2 text={'Create User'} type={'submit'}/>
            </div>
        </form>
    )
}

export default CreateUserComponent;