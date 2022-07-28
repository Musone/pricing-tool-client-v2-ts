import React, {ChangeEvent, FunctionComponent, ReactElement, useEffect, useState} from 'react';
import useHttpRequest from "../../hooks/useHttpRequest";
import LoadingSpinner from "../../components/Spinner";
import ICounselor from "../../components/lists/interfaces/ICounselor";
import DropdownMultiselect from "../../components/dropdowns/DropdownMultiselect";
import config from "../../config/config";
import PageWrapper from "../../components/PageWrapper";
import {APPROACH_DUMBY_LIST, GENDER_DUMBY_LIST, LANG_DUMBY_LIST, SPECS_DUMBY_LIST} from "../../constants/Constants";
import IProvinceAndCity from "../../components/lists/interfaces/IProvinceAndCity";
import PROVINCES_DUMBY_LIST from "../../constants/Provinces";
import InPersonFilters from "../../components/InPersonFilter";
import RegularList from "../../components/lists/RegularList";
import CounselorCardItem from "../../components/counselorCard/CounselorCardItem";
import CardDisplayTypeContext from "../../contexts/CardDisplayTypeContext";
import DisplayType from "../../enums/DisplayType";
import Dropdown from "../../components/dropdowns/Dropdown";
import CheckBoxInputContainer from "../../components/form/CheckBoxInput";

export interface QueryParamObj {
    counselling: boolean | null,
    supervising: boolean | null,
    maxPrice: number | null,
    gender: string[] | null,
    specializations: string[] | null,
    approach: string[] | null,
    languages: string[] | null,
    province: string[] | null,
    city: string[] | null,
}

const FindACounselorPage: FunctionComponent<{
    displayType: DisplayType
}> = ({displayType}): ReactElement => {

    const DEFAULT_URL = `${config.serverUrl}/api/counselors?`;
    const [ajaxUrl, setAjaxUrl] = useState(DEFAULT_URL);
    const {isLoading, isError, data} = useHttpRequest(ajaxUrl);

    const [activateSpinner, setActivateSpinner] = useState(true);
    const [queryParams, setQueryParams] = useState<QueryParamObj>({
        counselling: displayType === DisplayType.Counselor,
        supervising: displayType === DisplayType.Supervisor,
        maxPrice: 100,
        gender: null,
        specializations: null,
        approach: null,
        languages: null,
        province: null,
        city: null,
    });
    const [cardDisplayTypeContext, setDisplayTypeContext] = useState<DisplayType>(displayType);
    const [inPerson, setInPerson] = useState<{ checked: boolean, data: IProvinceAndCity }>({
        checked: false,
        data: {city: Object.values(PROVINCES_DUMBY_LIST)[0][0], province: Object.keys(PROVINCES_DUMBY_LIST)[0]}
    });

    useEffect(() => {
        let temp = {...queryParams};
        if (inPerson.checked) {
            temp.province = [inPerson.data.province];
            temp.city = [inPerson.data.city];
        } else {
            temp.province = null;
            temp.city = null;
        }
        setQueryParams(temp);
    }, [inPerson])


    useEffect(() => {
        if (!activateSpinner) {
            setActivateSpinner(false);
        } else {
            // setActivateSpinner(true)
        }
        setTimeout(() => {
            if (!activateSpinner) {
                setActivateSpinner(true)
            }
        }, 3000)

    }, [isLoading])

    /**
     * Updates the url and thereby triggers a new request when filters are applied.
     */
    useEffect(() => {
        let temp = DEFAULT_URL;
        let isFirst = true;

        Object.entries(queryParams).forEach(([key, value]) => {
            if (value === null || value.length < 1) return;

            if (isFirst) isFirst = false;
            else temp += '&';

            temp += `${key}=`;

            if (Array.isArray(value)) {
                temp += value.join(',');
            } else {
                temp += value;
            }
        })

        setAjaxUrl(temp);
        // console.debug({ajaxUrl})
    }, [queryParams]);

    function handleSliderOnChange(e: ChangeEvent<HTMLInputElement>) {
        let temp: QueryParamObj = {...queryParams};
        const newPrice: number = parseInt(e.target.value);

        if (isNaN(newPrice)) {
            throw Error('The value of the price slider component is NaN.')
        }

        temp.maxPrice = newPrice;
        setQueryParams(temp);
    }

    return (
        <CardDisplayTypeContext.Provider value={[cardDisplayTypeContext, setDisplayTypeContext]}>
            <PageWrapper>
                <div className={'max-w-screen-2xl mt-12 flex w-3/4 bg-greaen-800 mb-10'}>
                    <span className={'font-bold text-4xl'}>
                        Find a{' '}
                        <span className={'text-secondary_1'}>
                            {displayType}.
                        </span>
                    </span>
                </div>

                <div className="pt-1 w-3/4 max-w-screen-2xl">
                    <div className={'w-full'}>
                        <label htmlFor="priceSlider" className="text-2xl font-semibold form-label">
                            I can afford up to{' '}
                            <span className={'text-secondary_1'}>
                        ${queryParams.maxPrice}
                    </span>
                        </label>
                        <input
                            type="range"
                            className={"overflow-visible appearance-none rounded-full bg-neutral-400 w-full h-2 p-0 focus:outline-none "}
                            id="priceSlider"
                            min={0}
                            max={500}
                            value={(queryParams.maxPrice as number)}
                            onChange={handleSliderOnChange}
                        />
                    </div>
                </div>

                <div className={'w-3/4 max-w-screen-2xl'}>
                    <div
                        className={'my-10 self-start w-full md:w-[625px] flex flex-wrap h-auto gap-5 2xl:gap-10 xl:flex-nowrap'}>
                        <DropdownMultiselect idProp={'genderFilterButton'} formKey={'gender'}
                                             filtersList={GENDER_DUMBY_LIST}
                                             form={queryParams}
                                             setForm={setQueryParams}/>
                        <DropdownMultiselect idProp={'specializationsFilterButton'} formKey={'specializations'}
                                             filtersList={SPECS_DUMBY_LIST} form={queryParams}
                                             setForm={setQueryParams}/>
                        <DropdownMultiselect idProp={'approachFilterButton'} formKey={'approach'}
                                             filtersList={APPROACH_DUMBY_LIST} form={queryParams}
                                             setForm={setQueryParams}/>
                        <DropdownMultiselect idProp={'languagesFilterButton'} formKey={'languages'}
                                             filtersList={LANG_DUMBY_LIST} form={queryParams}
                                             setForm={setQueryParams}/>
                    </div>
                </div>

                <div className={'w-3/4 max-w-screen-2xl mb-5 -ml-10 -mt-10'}>
                    <CheckBoxInputContainer className={'bg-white'}
                                            hideWhenDisabled={true}
                                            id={'inPerson-checkbox-input'}
                                            label={'In Person'}
                                            setForm={(value: IProvinceAndCity, checked: boolean) => {
                                                setInPerson({
                                                    checked: checked,
                                                    data: value
                                                })
                                            }}>
                        <Dropdown noChoose={true}
                                  formKey={"province"}
                                  filterList={Object.keys(PROVINCES_DUMBY_LIST)}
                                  form={inPerson.data}
                        />

                        <Dropdown
                            noChoose={true}
                            formKey={"city"}
                            value={PROVINCES_DUMBY_LIST[inPerson.data.province as keyof typeof PROVINCES_DUMBY_LIST][0]}
                            filterList={PROVINCES_DUMBY_LIST[inPerson.data.province as keyof typeof PROVINCES_DUMBY_LIST]}
                            form={inPerson.data}
                        />
                    </CheckBoxInputContainer>
                </div>

                <hr className={'w-4/5 mb-10 self-center'}/>

                {!isLoading && !data &&
                    <span className={'text-muted'}>
                    It doesn't look like there are any counselors available at this time.
                </span>
                }

                {isLoading && activateSpinner &&
                    <div className={'bg-contain w-20 h-fit'}>
                        <LoadingSpinner/>
                    </div>
                }

                {!isLoading && data &&
                    <>
                        <div className={'px-5 w-3/4 max-w-screen-xl'}>
                            <span className={'text-muted hover:cursor-default'}>{
                                (data as string[]).length
                                + ' counselor'
                                + ((data as string[]).length === 1 ? ' ' : 's ')
                                + 'available'
                            }</span>
                        </div>

                        {(data as string[]).length < 1 ?
                            <span className={'text-muted my-5'}>
                                    It doesn't look like there are any counselors that match your filters.
                                </span>
                            : <>
                                <RegularList itemList={[...data] as ICounselor[]} resourceName={"counselor"}
                                             itemComponent={CounselorCardItem}/>
                            </>
                        }
                    </>
                }
            </PageWrapper>
        </CardDisplayTypeContext.Provider>
    )
}

export default FindACounselorPage;