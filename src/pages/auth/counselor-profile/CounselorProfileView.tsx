import React, {ChangeEvent, FunctionComponent, useEffect, useState} from "react";

import {FormState, UseFormReturn} from "react-hook-form";
import {IPutCounselorForm} from "./PutCounselorFormSchema";
import {ServerError} from "./CounselorProfileLogic";
import ICounselor from "../../../components/lists/interfaces/ICounselor";
import CounselorCardItem from "../../../components/counselorCard/CounselorCardItem";
import TextArea from "../../../components/form/TextArea";
import Dropdown from "../../../components/dropdowns/Dropdown";
import {
    APPROACH_DUMBY_LIST,
    CREDS_DUMBY_LIST,
    GENDER_DUMBY_LIST,
    LANG_DUMBY_LIST,
    PRONOUN_DUMBY_LIST,
    SPECS_DUMBY_LIST
} from "../../../constants/Constants";
import DropdownMultiselect from "../../../components/dropdowns/DropdownMultiselect";
import CheckBoxInputContainer from "../../../components/form/CheckBoxInput";
import PROVINCES_DUMBY_LIST from "../../../constants/Provinces";
import IProvinceAndCity from "../../../components/lists/interfaces/IProvinceAndCity";
import ISupervisingInfo from "../../../components/lists/interfaces/ISupervisingInfo";
import NumberInput from "../../../components/form/NumberInput";
import ICounsellingInfo from "../../../components/lists/interfaces/ICounsellingInfo";
import PrimaryButton_1 from "../../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../../components/buttons/PrimaryButton_2";


const CounselorProfileView: FunctionComponent<{
    serverError: ServerError | null,
    form: UseFormReturn<IPutCounselorForm>,
    onSubmit: (data: IPutCounselorForm) => any,
    defaultPreviewData: ICounselor | null,
    handleNumberInput: (form: keyof IPutCounselorForm, val: string) => number | string
}> = ({form, onSubmit, serverError, defaultPreviewData, handleNumberInput}) => {
    const {formState, register, handleSubmit} = form;
    const {errors, isSubmitting} = formState;

    const [editProfile, setEditProfile] = useState(false);
    const [counselorPreviewData, setCounselorPreviewData] = useState<ICounselor | null>(defaultPreviewData);
    const [inPersonSynchronizer, setInPersonSynchronizer] = useState<IProvinceAndCity>(
        form.getValues('in_person') ?? {
            city: Object.values(PROVINCES_DUMBY_LIST)[0][0],
            province: Object.keys(PROVINCES_DUMBY_LIST)[0]
        }
    );
    const [supervisingSynchronizer, setSupervisingSynchronizer] = useState<ISupervisingInfo>(
        {
            minPrice: form.getValues('supervising')?.minPrice ?? 0,
            maxPrice: form.getValues('supervising')?.maxPrice ?? 0,
            occupancy: form.getValues('supervising')?.occupancy ?? 0,
        }
    );
    const [counsellingSynchronizer, setCounsellingSynchronizer] = useState<ICounsellingInfo>(
        {
            minPrice: form.getValues('counselling')?.minPrice ?? 0,
            maxPrice: form.getValues('counselling')?.maxPrice ?? 0,
        }
    );

    /**
     * Updates
     * @param updatedForm
     */
    const syncFormWithPreview = (updatedForm: IPutCounselorForm) => {
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

    form.watch(() => {
        // console.log({form: form.getValues()})
        syncFormWithPreview(form.getValues());
    });

    return (
        <>
            {/* PREVIEW */}
            <div className={'w-full'}>
                <label className={'font-semibold text-lg'}>Counselor Preview</label>
                <div className={'border border-muted p-5 rounded-md'}>
                    {counselorPreviewData ?
                        <CounselorCardItem counselor={counselorPreviewData}/>
                        :
                        <span>No preview available</span>
                    }
                </div>
            </div>
            {/* ~~~~~~~ */}

            {editProfile && <>

                <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col w-full gap-7`}>

                    <div className={'flex flex-wrap gap-7'}>
                        <NumberInput label={'Age'}
                                     id={'age-number-input'}
                                     value={form.getValues('age')}
                                     register={register('age', {
                                         setValueAs: value => handleNumberInput('age', value),
                                     })}
                                     err={errors.age}
                        />


                        <NumberInput label={'Jane ID'}
                                     id={'janeid-number-input'}
                                     value={form.getValues('janeId') as number | ''}
                                     register={register('janeId', {
                                         setValueAs: value => handleNumberInput('janeId', value),
                                     })}
                        />
                    </div>

                    <div className={'flex flex-wrap w-full gap-7'}>
                        <Dropdown filterList={PRONOUN_DUMBY_LIST} formKey={'pronouns'}
                                  form={form.getValues()}
                                  setForm={(formCopy: IPutCounselorForm) => form.setValue('pronouns', formCopy.pronouns)}
                                  err={errors.pronouns}
                        />

                        <Dropdown filterList={GENDER_DUMBY_LIST} formKey={'gender'}
                                  form={form.getValues()}
                                  setForm={(formCopy: IPutCounselorForm) => form.setValue('gender', formCopy.gender)}
                                  err={errors.gender}
                        />
                    </div>


                    <div className={'flex flex-wrap w-full gap-7'}>
                        <DropdownMultiselect formKey={'specializations'}
                                             filtersList={SPECS_DUMBY_LIST}
                                             form={form.getValues()}
                                             setForm={(formCopy: IPutCounselorForm) => form.setValue('specializations', formCopy.specializations)}
                        />
                        <DropdownMultiselect formKey={'credentials'}
                                             filtersList={CREDS_DUMBY_LIST}
                                             form={form.getValues()}
                                             setForm={(formCopy: IPutCounselorForm) => form.setValue('credentials', formCopy.credentials)}
                        />
                        <DropdownMultiselect formKey={'languages'}
                                             filtersList={LANG_DUMBY_LIST}
                                             form={form.getValues()}
                                             setForm={(formCopy: IPutCounselorForm) => form.setValue('languages', formCopy.languages)}
                        />
                        <DropdownMultiselect formKey={'approach'}
                                             filtersList={APPROACH_DUMBY_LIST}
                                             form={form.getValues()}
                                             setForm={(formCopy: IPutCounselorForm) => form.setValue('approach', formCopy.approach)}
                        />
                    </div>


                    <TextArea id={'description-textarea-input'}
                              label={'Description'}
                              register={register('descriptionLong')}/>

                    <TextArea label={'Introduction'}
                              register={register('introduction')}
                              id={'introduction-textarea-input'}/>

                    <TextArea id={'approachDesc-textarea-input'}
                              label={'Therapy Approach'}
                              register={register('approachDesc')}/>


                    <CheckBoxInputContainer id={'inPerson-checkbox-input'}
                                            defaultChecked={form.getValues('in_person') !== null}
                                            label={'In Person'}
                                            setForm={(value: IProvinceAndCity, checked: boolean) => {
                                                if (checked) {
                                                    form.setValue('in_person', value);
                                                    setInPersonSynchronizer(value);
                                                } else {
                                                    form.setValue('in_person', null);
                                                }
                                            }}>
                        <Dropdown noChoose={true}
                                  formKey={"province"}
                                  filterList={Object.keys(PROVINCES_DUMBY_LIST)}
                                  form={inPersonSynchronizer}
                        />

                        <Dropdown
                            noChoose={true}
                            formKey={"city"}
                            value={PROVINCES_DUMBY_LIST[inPersonSynchronizer.province as keyof typeof PROVINCES_DUMBY_LIST][0]}
                            filterList={PROVINCES_DUMBY_LIST[inPersonSynchronizer.province as keyof typeof PROVINCES_DUMBY_LIST]}
                            form={inPersonSynchronizer}
                        />
                    </CheckBoxInputContainer>

                    <div className={'flex flex-wrap gap-7'}>
                        <CheckBoxInputContainer defaultChecked={form.getValues('counselling') !== null}
                                                label={'Counselling'}
                                                id={'counselling-checkbox-input'}
                                                giveSetFormToChildren={false}
                                                setForm={(nothing: undefined, checked: boolean) => {
                                                    if (checked) {
                                                        form.setValue('counselling', counsellingSynchronizer);
                                                    } else {
                                                        form.setValue('counselling', null);
                                                    }
                                                }}
                                                err={errors.counselling}
                        >

                            <NumberInput label={'Cost per session'}
                                         id={'counselling-costPerSession-number-input'}
                                         value={counsellingSynchronizer.minPrice}
                                         setForm={(value: number) => {
                                             if (form.getValues('counselling') !== null) {
                                                 form.setValue('counselling.minPrice', value);
                                                 form.setValue('counselling.maxPrice', value);
                                             }

                                             setCounsellingSynchronizer({
                                                 minPrice: value,
                                                 maxPrice: value,
                                             })
                                         }}
                            />
                        </CheckBoxInputContainer>

                        <CheckBoxInputContainer defaultChecked={form.getValues('supervising') !== null}
                                                label={'Supervising'}
                                                id={'supervising-checkbox-input'}
                                                giveSetFormToChildren={false}
                                                setForm={(nothing: undefined, checked: boolean) => {
                                                    if (checked) {
                                                        form.setValue('supervising', supervisingSynchronizer);
                                                    } else {
                                                        form.setValue('supervising', null);
                                                    }
                                                }}
                        >

                            <NumberInput label={'Cost per session'}
                                         id={'supervising-costPerSession-number-input'}
                                         value={supervisingSynchronizer.minPrice}
                                         setForm={(value: number) => {
                                             if (form.getValues('supervising') !== null) {
                                                 form.setValue('supervising.minPrice', value);
                                                 form.setValue('supervising.maxPrice', value);
                                             }

                                             setSupervisingSynchronizer({
                                                 minPrice: value,
                                                 maxPrice: value,
                                                 occupancy: supervisingSynchronizer.occupancy,
                                             })
                                         }}
                                         err={(errors.supervising as any)?.minPrice}
                            />

                            <NumberInput label={'Max Occupancy'}
                                         id={'supervising-occupancy-number-input'}
                                         value={supervisingSynchronizer.occupancy}
                                         setForm={(value: number) => {
                                             if (form.getValues('supervising') !== null) {
                                                 form.setValue('supervising.occupancy', value)
                                             }

                                             setSupervisingSynchronizer({
                                                 minPrice: supervisingSynchronizer.minPrice,
                                                 maxPrice: supervisingSynchronizer.maxPrice,
                                                 occupancy: value,
                                             })
                                         }}
                                         err={(errors.supervising as any)?.occupancy}
                            />

                        </CheckBoxInputContainer>
                    </div>

                    <div className={'flex flex-wrap'}>
                        <PrimaryButton_1 loading={isSubmitting} text={'Cancel'} callBack={() => setEditProfile(false)}/>
                        <PrimaryButton_2 loading={isSubmitting} text={'Save changes'} type={'submit'}/>
                    </div>
                </form>
            </>
            }

            {!editProfile &&
                <PrimaryButton_1 loading={isSubmitting}
                                 text={!defaultPreviewData ? 'Create Counselor Profile' : 'Edit Counselor Profile'}
                                 callBack={() => setEditProfile(true)}/>}
        </>
    )
}


export default CounselorProfileView;