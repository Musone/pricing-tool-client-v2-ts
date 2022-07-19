import React, {ChangeEvent, Component, FunctionComponent, ReactElement, useEffect, useState} from 'react';
import useHttpRequest from "../../hooks/useHttpRequest";
import LoadingSpinner from "../../components/Spinner";
import CounselorCardList from "./CounselorCardList";
import Counselor from "../../interfaces/Counselor";
import DropdownMultiselect from "../../components/DropdownMultiselect";
import config from "../../config/config";
import PageWrapper from "../../components/PageWrapper";
import {APPROACH_DUMBY_LIST, GENDER_DUMBY_LIST, LANG_DUMBY_LIST, SPECS_DUMBY_LIST} from "../../constants/Constants";
import ProvinceAndCity from "../../interfaces/ProvinceAndCity";
import PROVINCES_DUMBY_LIST from "../../constants/Provinces";
import InPersonFilters from "../../components/InPersonFilter";

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
    counsellingProp: boolean,
    supervisingProp: boolean
}> = ({counsellingProp, supervisingProp}): ReactElement => {
    const defaultPriceValue = 100;
    const [activateSpinner, setActivateSpinner] = useState(true);
    const [queryParams, setQueryParams] = useState<QueryParamObj>({
        counselling: counsellingProp,
        supervising: supervisingProp,
        maxPrice: defaultPriceValue,
        gender: null,
        specializations: null,
        approach: null,
        languages: null,
        province: null,
        city: null,
    });

    const [inPerson, setInPerson] = useState<{ checked: boolean, data: ProvinceAndCity }>({
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

    const DUMBY_FILTERS = [
        'filter 1',
        'filter 2',
        'filter 3',
        'filter 4',
        'filter 5',
        'filter 6',
        'filter 7',
        'filter 8',
        'filter 9',
        'filter 10',
        'filter 11',
        'filter 12',
        'filter 13',
        'bowls 13',
        'balls 13',
        'ballsgaming 13',
        "Bosnian",
        "Cantonese",
        "Croatian",
        "English",
        "Farsi",
        "French",
        "Greek",
        "Hindu",
        "Korean",
        "Mandarin",
        "Punjabi",
        "Serbian",
        "Spanish",
        "German",
        "Swedish",
        "Italian",
        "Danish",
    ]

    const DEFAULT_URL = `${config.serverUrl}/api/counselors?`;
    const [ajaxUrl, setAjaxUrl] = useState(DEFAULT_URL);
    const {isLoading, isError, data} = useHttpRequest(ajaxUrl);

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
            if (value === null) return;

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
        // console.debug({queryParams})
    }

    return (
        <PageWrapper>
            <div className={'max-w-screen-2xl mt-12 flex w-3/4 bg-greaen-800 mb-10'}>
                <span className={'font-bold text-4xl'}>
                    Find a{' '}
                    <span className={'text-secondary_1'}>
                        {counsellingProp && !supervisingProp && 'counselor'}
                        {!counsellingProp && supervisingProp && 'supervisor'}
                        {counsellingProp && supervisingProp && <>counselor <span
                            className={'text-black'}>or a</span> supervisor</>}
                        .
                    </span>
                </span>
            </div>

            <div id={'Price slider'} className="pt-1 w-3/4 max-w-screen-2xl">
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
                        max={200}
                        value={(queryParams.maxPrice as number)}
                        onChange={handleSliderOnChange}
                    />
                </div>
            </div>


            <div
                className={'my-10 flex flex-wrap w-3/4 h-auto gap-5 lg:gap-10 lg:flex-nowrap lg:flex-row xl:max-w-screen-2xl'}>
                <DropdownMultiselect idProp={'genderFilterButton'} filterLabel={'gender'}
                                     filtersList={GENDER_DUMBY_LIST}
                                     parentQuery={queryParams}
                                     setParentQuery={setQueryParams}/>
                <DropdownMultiselect idProp={'specializationsFilterButton'} filterLabel={'specializations'}
                                     filtersList={SPECS_DUMBY_LIST} parentQuery={queryParams}
                                     setParentQuery={setQueryParams}/>
                <DropdownMultiselect idProp={'approachFilterButton'} filterLabel={'approach'}
                                     filtersList={APPROACH_DUMBY_LIST} parentQuery={queryParams}
                                     setParentQuery={setQueryParams}/>
                <DropdownMultiselect idProp={'languagesFilterButton'} filterLabel={'languages'}
                                     filtersList={LANG_DUMBY_LIST} parentQuery={queryParams}
                                     setParentQuery={setQueryParams}/>
            </div>

            <div className={'w-3/4 max-w-screen-2xl mb-5 -mt-5'}>
                <InPersonFilters className={'-ml-5 -mt-5 bg-transparent'}
                                    hideWhenDisabled={true}
                                 label={'In Person Booking'}
                                 inPerson={inPerson}
                                 onChange={() => {
                                     setInPerson({
                                         checked: !inPerson.checked,
                                         data: inPerson.data
                                     });
                                 }}
                                 parentQuery={(val: ProvinceAndCity) =>
                                     setInPerson({
                                         checked: inPerson.checked,
                                         data: {
                                             province: val.province,
                                             city: PROVINCES_DUMBY_LIST[val.province as keyof typeof PROVINCES_DUMBY_LIST][0]
                                         }
                                     })}
                                 parentQuery1={(val: ProvinceAndCity) => setInPerson({
                                     checked: inPerson.checked,
                                     data: {
                                         province: inPerson.data.province,
                                         city: val.city,
                                     }
                                 })}/>
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
                        : <CounselorCardList counselorList={[...data] as Counselor[]} counsellingProp={counsellingProp}
                                             supervisingProp={supervisingProp}/>
                    }
                </>
            }
        </PageWrapper>
    )
}

export default FindACounselorPage;