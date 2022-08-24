import React, {ChangeEvent, FunctionComponent, ReactElement, useEffect, useState} from 'react';
import useHttpRequest from "../../hooks/useHttpRequest";
import LoadingSpinner from "../../components/Spinner";
import ICounselor from "../../components/lists/interfaces/ICounselor";
import DropdownMultiselect from "../../components/dropdowns/DropdownMultiselect";
import config from "../../config/config";
import PageWrapper from "../../components/PageWrapper";
import {APPROACH_LIST, GENDER_LIST, LANG_LIST, SPECS_LIST} from "../../hooks/useGetFilters";
import IProvinceAndCity from "../../components/lists/interfaces/IProvinceAndCity";
import PROVINCES_DUMBY_LIST from "../../constants/Provinces";
import RegularList from "../../components/lists/RegularList";
import CounselorCardItem from "../../components/counselorCard/CounselorCardItem";
import CardDisplayTypeContext from "../../contexts/CardDisplayTypeContext";
import DisplayType from "../../enums/DisplayType";
import Dropdown from "../../components/dropdowns/Dropdown";
import CheckBoxInputContainer from "../../components/form/CheckBoxInput";
import SearchBar from "../../components/SearchBar";
import isNullOrUndefined from "../../utils/isNullOrUndefined";
import GeoMap from "../../components/form/GeoMap";
import SearchBar2 from "../../components/SearchBar2";
import {LatLngExpression} from "leaflet";
import calculateSquareDistance from "../../utils/calculateSquareDistance";

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

enum SortBy {
    'None', 'Price (lowest to highest)', 'Price (highest to lowest)', 'Distance (nearest)', 'Alphabetic (A-Z)'
}

function enumToArray(myEnum: any) {
    return Object.keys(myEnum)
        .filter((value: any) => isNaN(Number(value)) === false)
        .map(key => myEnum[key]);
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

    const [userPos, setUserPos] = useState<LatLngExpression | null>(null);
    const [counselorList, setCounselorList] = useState<ICounselor[]>([]);
    const [counselorListCopy, setCounselorListCopy] = useState<ICounselor[]>([]);
    const [filterKey, setFilterKey] = useState('firstName');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortBy>(SortBy.None);

    useEffect(() => {
        if (!isNullOrUndefined(data)) {
            setCounselorListCopy([...data]);
        }
    }, [data])

    useEffect(() => {
        if (!isNullOrUndefined(data)) {
            setCounselorList(data.filter((counselor: ICounselor) => `${counselor.firstName.toLowerCase()} ${counselor.lastName.toLowerCase()}`.includes(search.toLowerCase())).sort((a: ICounselor, b: ICounselor) => {
                switch (sort) {
                    case SortBy.None:
                        return 0.5 - Math.random();
                        break;
                    case SortBy['Price (lowest to highest)']:
                        if (displayType === DisplayType.Counselor) {
                            return (a.counselling?.minPrice ?? 0) - (b.counselling?.minPrice ?? 0);
                        } else if (displayType === DisplayType.Supervisor) {
                            return (a.supervising?.minPrice ?? 0) - (b.supervising?.minPrice ?? 0);
                        }
                        break;
                    case SortBy['Price (highest to lowest)']:
                        if (displayType === DisplayType.Counselor) {
                            return (b.counselling?.minPrice ?? 0) - (a.counselling?.minPrice ?? 0);
                        } else if (displayType === DisplayType.Supervisor) {
                            return (b.supervising?.minPrice ?? 0) - (a.supervising?.minPrice ?? 0);
                        }
                        break;
                    case SortBy['Alphabetic (A-Z)']:
                        return a.firstName.localeCompare(b.firstName)
                        break;
                    case SortBy['Distance (nearest)']:
                        if (!userPos || (!a.geolocation && !b.geolocation)) return 0.5 - Math.random();
                        if (a.geolocation && !b.geolocation) return -1;
                        if (!a.geolocation && b.geolocation) return 1;
                        const lat = (userPos as number[])[0];
                        const lon = (userPos as number[])[1];
                        const sqDistA = calculateSquareDistance(lon, lat, a.geolocation?.longitude as number, a.geolocation?.latitude as number);
                        const sqDistB = calculateSquareDistance(lon, lat, b.geolocation?.longitude as number, b.geolocation?.latitude as number);

                        return sqDistA - sqDistB;
                        break;
                    default:
                        break;
                }
                return 0;
            }));
        }
    }, [data, search, sort, userPos])

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
                                             filtersList={GENDER_LIST}
                                             form={queryParams}
                                             setForm={setQueryParams}/>
                        <DropdownMultiselect idProp={'specializationsFilterButton'} formKey={'specializations'}
                                             filtersList={SPECS_LIST} form={queryParams}
                                             setForm={setQueryParams}/>
                        <DropdownMultiselect idProp={'approachFilterButton'} formKey={'approach'}
                                             filtersList={APPROACH_LIST} form={queryParams}
                                             setForm={setQueryParams}/>
                        <DropdownMultiselect idProp={'languagesFilterButton'} formKey={'languages'}
                                             filtersList={LANG_LIST} form={queryParams}
                                             setForm={setQueryParams}/>
                    </div>
                </div>

                <div className={'w-3/4 max-w-screen-2xl -ml-10 -mt-10'}>
                    {/*    <CheckBoxInputContainer className={'bg-white'}*/}
                    {/*                            hideWhenDisabled={true}*/}
                    {/*                            id={'inPerson-checkbox-input'}*/}
                    {/*                            label={'In Person'}*/}
                    {/*                            setForm={(value: IProvinceAndCity, checked: boolean) => {*/}
                    {/*                                setInPerson({*/}
                    {/*                                    checked: checked,*/}
                    {/*                                    data: value*/}
                    {/*                                })*/}
                    {/*                            }}>*/}
                    {/*        <Dropdown noChoose={true}*/}
                    {/*                  formKey={"province"}*/}
                    {/*                  filterList={Object.keys(PROVINCES_DUMBY_LIST)}*/}
                    {/*                  form={inPerson.data}*/}
                    {/*        />*/}

                    {/*        <Dropdown*/}
                    {/*            noChoose={true}*/}
                    {/*            formKey={"city"}*/}
                    {/*            value={PROVINCES_DUMBY_LIST[inPerson.data.province as keyof typeof PROVINCES_DUMBY_LIST][0]}*/}
                    {/*            filterList={PROVINCES_DUMBY_LIST[inPerson.data.province as keyof typeof PROVINCES_DUMBY_LIST]}*/}
                    {/*            form={inPerson.data}*/}
                    {/*        />*/}
                    {/*    </CheckBoxInputContainer>*/}

                    <CheckBoxInputContainer defaultChecked={true}
                                            className={'bg-white w-11/12 overflow-hidden min-w-[400px]'}
                                            hideWhenDisabled={true}
                                            id={'geo-map'}
                                            label={'Search In-Person sessions'}
                                            setForm={() => null}>
                        <GeoMap userPos={userPos} setUserPos={setUserPos} setSearch={setSearch}
                                counselors={counselorListCopy}/>
                    </CheckBoxInputContainer>
                </div>


                <div className={'flex flex-wrap w-3/4 items-end gap-3 mb-4 max-w-screen-2xl'}>
                    <Dropdown noChoose={true} formKey={'sort'} filterList={enumToArray(SortBy)} form={{sort: 'None'}}
                              setForm={(formCopy: { sort: keyof typeof SortBy }) => setSort(SortBy[formCopy.sort])}/>
                    <SearchBar2 searchLabel={'Search'}
                                placeholder={'Search by Name'}
                                searchValue={search}
                                setSearchValue={setSearch}/>
                </div>


                {/*<div className={'my-36 w-3/4 overflow-hidden'}>*/}
                {/*    <GeoMap counselors={counselorList}/>*/}
                {/*</div>*/}

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

                {!isLoading && data && counselorList &&
                    <>
                        <div className={'px-5 w-3/4 max-w-screen-xl'}>
                            <span className={'text-muted hover:cursor-default'}>{
                                counselorList.length
                                + ' counselor'
                                + (counselorList.length === 1 ? ' ' : 's ')
                                + 'available'
                            }</span>
                        </div>

                        {counselorList.length < 1 ?
                            <span className={'text-muted my-5'}>
                                    It doesn't look like there are any counselors that match your filters.
                                </span>
                            : <>
                                <RegularList itemList={[...counselorList] as ICounselor[]} resourceName={"counselor"}
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