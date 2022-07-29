import PageWrapper from "../../../../components/PageWrapper";
import {SPECS_LIST} from "../../../../hooks/useGetFilters";
import FilterContainer from "./FilterContainer";
import PrimaryButton_2 from "../../../../components/buttons/PrimaryButton_2";
import React, {FunctionComponent, useState} from "react";
import {COUNSELOR_URL, GET_FILTERS_URL} from "../../../../constants/urls";
import config from "../../../../config/config";


const TextInput: FunctionComponent<{
    error?: { message: string } | null,
    form: Object,
    formKey: string,
    setForm: CallableFunction,
    isInvalid?: boolean,
    defaultValue?: string,
    placeholder?: string,
    value?: string,
}> = ({error, form, setForm, formKey, value, placeholder, isInvalid, defaultValue}) => {

    return (
        <>
            <input
                value={value}
                className={`${error ? 'border-red-500' : 'border-gray-200'} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                onChange={(e) => {
                    let temp = {...form};

                    if (typeof temp[formKey as keyof typeof form] === 'undefined') {
                        throw new Error('Form does not contain formKey');
                    }

                    temp[formKey as keyof typeof form] = e.target.value as never;

                    setForm(temp);
                }} id="grid-first-name" type="text"
                placeholder={placeholder}/>
            {error &&
                <p className="text-red-500 text-xs italic">{error.message}</p>
            }
        </>
    )
}


const EditFiltersPage: FunctionComponent<{slug: string, filterList: string[]}> = ({slug, filterList}) => {
    const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
    const [form, setForm] = useState<{ filter: string }>({filter: ''})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (form.filter.length < 1) {
            setError({message: 'Cannot be empty'})
            return;
        }

        const body = {...form};

        setIsSubmitting(true);
        return fetch(`${GET_FILTERS_URL}${slug}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken ?? '',
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                if (res.status === 200) {
                    history.go();
                } else if (res.status === 409) {
                    setError({message: 'Filter Already exists'});
                } else {
                    throw new Error('Unkown error occured. Action failed');
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <PageWrapper>
            <div className={'flex flex-col w-3/4 items-center gap-4'}>

                <form className={'flex flex-wrap md:flex-row w-3/4 max-w-xl gap-3'} onSubmit={handleSubmit}>
                    <div className={'w-full max-w-sm'}>
                        <TextInput placeholder={'filter'}
                                   error={error}
                                   form={form}
                                   setForm={setForm}
                                   formKey={'filter'}
                                   value={form.filter}
                        />
                    </div>

                    <div>
                        <PrimaryButton_2 text={'Add Filter'} type={'submit'} loading={isSubmitting}/>
                    </div>
                </form>

                <div className={'w-3/4 max-w-screen-md'}>
                    {filterList.map((value, i) => <FilterContainer key={i} filter={value} deleteUrl={`${GET_FILTERS_URL}${slug}/${value}`}/>)}
                </div>

            </div>
        </PageWrapper>
    )
}

export default EditFiltersPage;