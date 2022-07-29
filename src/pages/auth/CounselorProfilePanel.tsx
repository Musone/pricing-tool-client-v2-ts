import React, {ChangeEvent, FormEvent, FunctionComponent, useContext, useEffect, useState} from "react";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import ICounselor from "../../components/lists/interfaces/ICounselor";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import config from "../../config/config";
import CounselorCardItem from "../../components/counselorCard/CounselorCardItem";
import DropdownMultiselect from "../../components/dropdowns/DropdownMultiselect";
import Dropdown from "../../components/dropdowns/Dropdown";
import ISupervisingInfo from "../../components/lists/interfaces/ISupervisingInfo";
import ICounsellingInfo from "../../components/lists/interfaces/ICounsellingInfo";
import {
    APPROACH_LIST,
    CREDS_LIST,
    GENDER_LIST,
    LANG_LIST,
    PRONOUN_LIST,
    SPECS_LIST
} from "../../hooks/useGetFilters";
import IProvinceAndCity from "../../components/lists/interfaces/IProvinceAndCity";
import PROVINCES_DUMBY_LIST from "../../constants/Provinces";
import InPersonFilters from "../../components/InPersonFilter";
import UserContext from "../../contexts/UserContext";
import {COUNSELOR_URL} from "../../constants/urls";

interface CounselorPutForm {
    age: null | number;

    gender: null | string; // single-select []

    pronouns: null | string; // single-select []

    languages: null | string[]; // drop-down multi-select []

    specializations: null | string[]; // drop-down multi-select []
    approach: null | string[];

    credentials: null | string[]; // drop-down multi-select []

    pfp: null | string; // click file upload []

    approachDesc: null | string; // text area []

    descriptionLong: null | string; //text area []

    introduction: null | string; // text area []

    janeId: null | number; // number []

    in_person: null | { city: string, province: string }; // check box with disabled fields []

    counselling: null | { minPrice: number, maxPrice: number }; // check box with disabled fields []

    supervising: null | { minPrice: number, maxPrice: number, occupancy: number }; // check box with disabled fields []
}


const CounselorProfilePanel: FunctionComponent<{ loading: boolean, currentUserCounselorProfile?: ICounselor, isCreating: boolean, setLoading: CallableFunction }>
    = ({currentUserCounselorProfile, isCreating, setLoading, loading}) => {
    const [form, setForm] = useState<CounselorPutForm>({
        age: currentUserCounselorProfile ? currentUserCounselorProfile.age : null,
        janeId: currentUserCounselorProfile ? currentUserCounselorProfile.janeId : null,
        gender: currentUserCounselorProfile ? currentUserCounselorProfile.gender : null,
        pronouns: currentUserCounselorProfile ? currentUserCounselorProfile.pronouns : null,
        languages: currentUserCounselorProfile ? currentUserCounselorProfile.languages : null,
        specializations: currentUserCounselorProfile ? currentUserCounselorProfile.specializations : null,
        approach: currentUserCounselorProfile ? currentUserCounselorProfile.approach : null,
        approachDesc: currentUserCounselorProfile ? currentUserCounselorProfile.approachDesc : null,
        credentials: currentUserCounselorProfile ? currentUserCounselorProfile.credentials : null,
        pfp: currentUserCounselorProfile ? currentUserCounselorProfile.pfp : null,
        descriptionLong: currentUserCounselorProfile ? currentUserCounselorProfile.descriptionLong : null,
        introduction: currentUserCounselorProfile ? currentUserCounselorProfile.introduction : null,
        in_person: currentUserCounselorProfile ? currentUserCounselorProfile.in_person : null,
        counselling: currentUserCounselorProfile ? currentUserCounselorProfile.counselling : null,
        supervising: currentUserCounselorProfile ? currentUserCounselorProfile.supervising : null,
    });
    const [error, setError] = useState<'SERVER_ERROR' | 'REQUIRED_ERROR' | null>(null);

    const [counselling, setCounselling] = useState<{ checked: boolean, data: ICounsellingInfo }>({
        checked: false,
        data: {minPrice: 0, maxPrice: 0}
    });

    const [inPerson, setInPerson] = useState<{ checked: boolean, data: IProvinceAndCity }>({
        checked: false,
        data: {city: Object.values(PROVINCES_DUMBY_LIST)[0][0], province: Object.keys(PROVINCES_DUMBY_LIST)[0]}
    });

    const [supervising, setSupervising] = useState<{ checked: boolean, data: ISupervisingInfo }>(
        {
            checked: false,
            data: {minPrice: 0, maxPrice: 0, occupancy: 0}
        });

    const [counselorPreviewData, setCounselorPreviewData] = useState<ICounselor | null>(null);

    const [userContext, setUserContext] = useContext(UserContext);
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        let temp = {...form};
        if (counselling.checked) {
            temp.counselling = counselling.data;
        } else {
            temp.counselling = null;
        }

        if (supervising.checked) {
            temp.supervising = supervising.data;
        } else {
            temp.supervising = null;
        }

        if (inPerson.checked) {
            temp.in_person = inPerson.data;
        } else {
            temp.in_person = null;
        }

        setForm(temp);
    }, [counselling, supervising, inPerson])

    useEffect(() => {

        if (typeof currentUserCounselorProfile !== 'undefined' && currentUserCounselorProfile !== null) {
            Object.entries(currentUserCounselorProfile).forEach(([k, v]) => {
                if (Object.keys(form).includes(k)) {
                    const key = k as keyof CounselorPutForm;
                    form[key] = v as never;
                }
            })

            if (currentUserCounselorProfile.counselling !== null) {
                setCounselling({
                    checked: true,
                    data: currentUserCounselorProfile.counselling
                });
            }

            if (currentUserCounselorProfile.supervising !== null) {
                setSupervising({
                    checked: true,
                    data: currentUserCounselorProfile.supervising,
                });
            }

            if (currentUserCounselorProfile.in_person !== null) {
                setInPerson({
                    checked: true,
                    data: currentUserCounselorProfile.in_person,
                });
            }

            setCounselorPreviewData(currentUserCounselorProfile);
        }


    }, [currentUserCounselorProfile])

    useEffect(() => {

    }, [counselorPreviewData])

    /**
     * Updates
     * @param updatedForm
     */
    function syncFormWithPreview(updatedForm: CounselorPutForm) {
        if (updatedForm !== null && counselorPreviewData !== null) {
            let temp: ICounselor = {...counselorPreviewData};

            Object.entries(updatedForm).forEach(([k, v]) => {
                if (Object.keys(counselorPreviewData).includes(k)) {
                    const key = k as keyof ICounselor;

                    if (v === null) {
                        if (Array.isArray(temp[key])) {
                            temp[key] = [] as never;
                        } else if (typeof temp[key] === 'string') {
                            temp[key] = '' as never;
                        } else {
                            temp[key] = null as never;
                        }
                    } else {
                        temp[key] = v as never;
                    }
                }
            })

            setCounselorPreviewData(temp);
        }
    }

    useEffect(() => {
        syncFormWithPreview(form);
    }, [form]);


    function updateFormAndPreview(value: any, key: keyof CounselorPutForm) {
        let temp = {...form};
        temp[key] = value as never;
        setForm(temp);

        if (counselorPreviewData !== null) {
            let temp2: ICounselor = {...counselorPreviewData};
            temp2[key as keyof ICounselor] = value as never;
            setCounselorPreviewData(temp2);
        }
    }

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
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);
        setError(null);

        if (accessToken === null) {
            setLoading(false)
            return;
        }

        let body: Partial<CounselorPutForm> = {};

        Object.entries(form).forEach(([k, v]) => {
            let key = k as keyof CounselorPutForm;
            if (isCreating) {
                if (form[key] !== null) {
                    body[key] = v;
                }
            } else {
                if (form[key] !== null && currentUserCounselorProfile && form[key] !== currentUserCounselorProfile[key]) {
                    body[key] = v;
                }
            }
        })

        body.supervising = form.supervising;
        body.counselling = form.counselling;
        body.in_person = form.in_person;

        let lastRes: Response | undefined = undefined;
        fetch(`${COUNSELOR_URL}/${userContext?._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken || '',
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                lastRes = res;
                if (res.status !== 200) {
                    throw new Error('Request rejected');
                }

                localStorage.removeItem(config.localStorageAccessTokenKey);
                window.history.go();
            })
            .catch((err) => {
                if (typeof lastRes === 'undefined') {
                    setError('SERVER_ERROR');
                    throw new Error(err);
                } else if (lastRes.status === 400) {
                    setError('REQUIRED_ERROR');
                } else {
                    setError('SERVER_ERROR');
                }
                console.log({lastRes});
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className={'w-full'}>
                <label className={'font-semibold text-lg'}>Counselor Preview</label>
                <div className={'border-2 border-muted p-5 rounded-md'}>
                    {counselorPreviewData ?
                        <CounselorCardItem counselor={counselorPreviewData} />
                        :
                        <span>No preview available</span>
                    }
                </div>
            </div>
            {editProfile && (
                <>
                    <form onSubmit={handleSubmit} className={`flex flex-col gap-5 w-full`}>

                        <div className={'flex flex-col px-5 gap-4 w-full'}>


                            <div className={'flex flex-col'}>
                                <label htmlFor={'pfp-input'} className={'font-semibold'}>Change Profile
                                    Picture</label>
                                <input id={'pfp-input'} type={'file'} className={''} onChange={fileSelectedHandler}/>
                            </div>

                            <div className={'flex flex-wrap gap-7'}>
                                <div className={'flex flex-col'}>
                                    <label className={'font-semibold focus:outline-0'} htmlFor={'age-input'}>Age<span
                                        className={`${isCreating ? 'visible' : 'hidden'} ml-1.5 text-xs text-red-600`}>*required</span></label>
                                    <input
                                        className={'outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded'}
                                        id={'age-input'} type={'number'}
                                        value={form.age === null ? undefined : form.age} onChange={(e) => {
                                        let temp = {...form};
                                        temp.age = parseInt(e.target.value);

                                        if (isNaN(temp.age)) {
                                            return;
                                        }

                                        setForm(temp);
                                    }} min={19} max={100}/>


                                </div>
                                <div className={'flex flex-col'}>

                                    <label className={'font-semibold focus:outline-0'} htmlFor={'janeid-input'}>Jane
                                        ID</label>
                                    <input
                                        className={'outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded'}
                                        id={'janeid-input'} type={'number'}
                                        value={form.janeId === null ? undefined : form.janeId} onChange={(e) => {
                                        let temp = {...form};
                                        temp.janeId = parseInt(e.target.value);

                                        if (isNaN(temp.janeId)) {
                                            return;
                                        }

                                        setForm(temp);
                                    }} min={0}/>
                                </div>
                            </div>

                            <div className={'flex flex-wrap w-full gap-7'}>
                                <div>
                                    <label className={'font-semibold focus:outline-0'}>Pronouns<span
                                        className={`${isCreating ? 'visible' : 'hidden'} ml-1.5 text-xs text-red-600`}>*required</span></label>
                                    <Dropdown filterList={PRONOUN_LIST} formKey={'pronouns'}
                                              form={form} setForm={setForm} />
                                </div>

                                <div>
                                    <label className={'font-semibold focus:outline-0'}>Gender<span
                                        className={`${isCreating ? 'visible' : 'hidden'} ml-1.5 text-xs text-red-600`}>*required</span></label>
                                    <Dropdown filterList={GENDER_LIST} formKey={'gender'}
                                              form={form} setForm={setForm} />
                                </div>
                            </div>

                            <div className={'flex flex-wrap w-full gap-7'}>
                                <div className={'flex flex-col'}>
                                    <label className={'font-semibold'}>Specializations</label>
                                    <DropdownMultiselect formKey={'specializations'}
                                                         filtersList={SPECS_LIST} form={form}
                                                         setForm={setForm}
                                                         />
                                </div>

                                <div className={'flex flex-col'}>
                                    <label className={'font-semibold'}>Credentials</label>
                                    <DropdownMultiselect formKey={'credentials'}
                                                         filtersList={CREDS_LIST} form={form}
                                                         setForm={setForm}
                                                         />
                                </div>

                                <div className={'flex flex-col'}>
                                    <label className={'font-semibold'}>Languages</label>
                                    <DropdownMultiselect formKey={'languages'}
                                                         filtersList={LANG_LIST}
                                                         form={form}
                                                         setForm={setForm}

                                    />
                                </div>

                                <div className={'flex flex-col'}>
                                    <label className={'font-semibold'}>Approach</label>
                                    <DropdownMultiselect formKey={'approach'}
                                                         filtersList={APPROACH_LIST}
                                                         form={form}
                                                         setForm={setForm}

                                    />
                                </div>
                            </div>
                        </div>

                        <div className={'flex flex-wrap w-full'}>
                            <div className={'flex flex-col w-full p-5'}>
                                <label className={'font-semibold'} htmlFor={'description-textarea'}>Description</label>
                                <textarea id={'description-textarea'}
                                          className={'outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded'}
                                          placeholder={"Description"}
                                          value={form.descriptionLong === null ? undefined : form.descriptionLong}
                                          onChange={(e) => {
                                              let temp = {...form};
                                              temp.descriptionLong = e.target.value;
                                              setForm(temp);
                                          }}
                                />
                            </div>

                            <div className={'flex flex-col w-full p-5'}>
                                <label className={'font-semibold'}
                                       htmlFor={'introduction-textarea'}>Introduction</label>
                                <textarea id={'introduction-textarea'}
                                          className={'outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded'}
                                          placeholder={"Introduction"} onChange={(e) => {
                                    let temp = {...form};
                                    temp.introduction = e.target.value;
                                    setForm(temp);
                                }} value={form.introduction === null ? undefined : form.introduction}/>
                            </div>

                            <div className={'flex flex-col w-full p-5'}>
                                <label className={'font-semibold'} htmlFor={'therapyApproach-textarea'}>Therapy
                                    Approach</label>
                                <textarea id={'therapyApproach-textarea'}
                                          className={'outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded'}
                                          placeholder={"Therapy Approach"}
                                          value={form.approachDesc === null ? undefined : form.approachDesc}
                                          onChange={(e) => {
                                              let temp = {...form};
                                              temp.approachDesc = e.target.value;
                                              setForm(temp);
                                          }}
                                />
                            </div>
                        </div>

                        <div className={'ml-5'}>
                            <InPersonFilters inPerson={inPerson} onChange={() => {
                                setInPerson({
                                    checked: !inPerson.checked,
                                    data: inPerson.data
                                });
                            }} parentQuery={(val: IProvinceAndCity) =>
                                setInPerson({
                                    checked: inPerson.checked,
                                    data: {
                                        province: val.province,
                                        city: PROVINCES_DUMBY_LIST[val.province as keyof typeof PROVINCES_DUMBY_LIST][0]
                                    }
                                })} parentQuery1={(val: IProvinceAndCity) => setInPerson({
                                checked: inPerson.checked,
                                data: {
                                    province: inPerson.data.province,
                                    city: val.city,
                                }
                            })}/>
                        </div>

                        {/*SUPERVISING & COUNSELLING*/}
                        <div className={'flex flex-wrap gap-7'}>
                            <div
                                className={`bg-offWhite flex flex-col justify-start w-fit h-fit p-5 m-5 gap-3 rounded`}>
                                <div className={'flex flex-col w-fit items-start'}>
                                    <label htmlFor={'counselling-input-checkbox'}>Counselling</label>
                                    <input id={'counselling-input-checkbox'} type={'checkbox'}
                                           checked={counselling.checked}
                                           className={'accent-primary_main'} onChange={() => {
                                        setCounselling({
                                            checked: !counselling.checked,
                                            data: counselling.data
                                        });
                                    }}
                                    />
                                </div>

                                <div
                                    className={`flex flex-wrap gap-4 p-3 border-2 rounded ${counselling.checked ? '' : 'bg-offWhite brightness-75 disabled'}`}>
                                    <div className={'flex flex-col'}>
                                        <label htmlFor={'counselling-price-input'}>Cost per session</label>
                                        <input
                                            id={'counselling-price-input'}
                                            type={'number'}
                                            disabled={!counselling.checked}
                                            className={`disabled:hover:cursor-not-allowed outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded`}
                                            value={counselling.data.minPrice}
                                            onChange={(e) => {
                                                const value: number = parseInt(e.target.value);

                                                if (isNaN(value)) {
                                                    return;
                                                }

                                                setCounselling({
                                                    checked: counselling.checked,
                                                    data: {minPrice: value, maxPrice: value}
                                                })
                                            }}
                                            min={0}
                                        />

                                    </div>
                                </div>
                            </div>

                            <div
                                className={`bg-offWhite flex flex-col justify-start w-fit h-fit p-5 m-5 gap-3 rounded`}>
                                <div className={'flex flex-col w-fit items-start'}>
                                    <label htmlFor={'supervising-input-checkbox'}>Supervising</label>
                                    <input id={'supervising-input-checkbox'} type={'checkbox'}
                                           checked={supervising.checked}
                                           className={'accent-primary_main'} onChange={() => {
                                        setSupervising({
                                            checked: !supervising.checked,
                                            data: supervising.data
                                        });
                                    }}
                                    />
                                </div>

                                <div
                                    className={`flex flex-wrap gap-4 p-3 border-2 rounded ${supervising.checked ? '' : 'bg-offWhite brightness-75 disabled'}`}>
                                    <div className={'flex flex-col'}>
                                        <label htmlFor={'supervising-price-input'}>Cost per session</label>
                                        <input
                                            id={'supervising-price-input'}
                                            type={'number'}
                                            disabled={!supervising.checked}
                                            className={`disabled:hover:cursor-not-allowed outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded`}
                                            value={supervising.data.minPrice}
                                            onChange={(e) => {
                                                const value: number = parseInt(e.target.value);

                                                if (isNaN(value)) {
                                                    return;
                                                }

                                                setSupervising({
                                                    checked: supervising.checked,
                                                    data: {
                                                        minPrice: value,
                                                        maxPrice: value,
                                                        occupancy: supervising.data.occupancy
                                                    }
                                                })
                                            }}
                                            min={0}
                                        />
                                    </div>

                                    <div className={'flex flex-col'}>
                                        <label htmlFor={'supervising-occupancy-input'}>Occupancy</label>
                                        <input
                                            id={'supervising-occupancy-input'}
                                            type={'number'}
                                            disabled={!supervising.checked}
                                            className={`disabled:hover:cursor-not-allowed outline-none p-2 border bg-gray-200 text-gray-700 focus:bg-white rounded`}
                                            value={supervising.data.occupancy}
                                            onChange={(e) => {
                                                const value: number = parseInt(e.target.value);

                                                if (isNaN(value)) {
                                                    return;
                                                }

                                                setSupervising({
                                                    checked: supervising.checked,
                                                    data: {
                                                        minPrice: supervising.data.minPrice,
                                                        maxPrice: supervising.data.maxPrice,
                                                        occupancy: value
                                                    }
                                                })
                                            }}
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'ml-5'}>
                            <span
                                className={`${error === 'REQUIRED_ERROR' ? 'visible' : 'hidden'} text-sm text-red-600`}>
                                Required fields cannot be left blank.
                            </span>
                            <span className={`${error === 'SERVER_ERROR' ? 'visible' : 'hidden'} text-sm text-red-600`}>
                                Server not responding. Try again later.
                            </span>
                        </div>

                        <div className={'ml-4'}>
                            <PrimaryButton_1 loading={loading} text={'Cancel'} callBack={() => setEditProfile(false)}/>
                            <PrimaryButton_2 loading={loading} text={'Save changes'} type={'submit'}/>
                        </div>
                    </form>
                </>
            )}


            {!editProfile &&
                <PrimaryButton_1 loading={loading}
                                 text={isCreating ? 'Create Counselor Profile' : 'Edit Counselor Profile'}
                                 callBack={() => setEditProfile(true)}/>}

        </>
    )
}

export default CounselorProfilePanel;