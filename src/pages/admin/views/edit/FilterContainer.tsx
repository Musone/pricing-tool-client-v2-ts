import {FunctionComponent, useState} from "react";
import DeleteButton from "../../../../components/buttons/DeleteButton";
import config from "../../../../config/config";


const FilterContainer: FunctionComponent<{
    filter: string,
    deleteUrl: string
}> = ({filter, deleteUrl}) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = () => {
        const accessToken = localStorage.getItem(config.localStorageAccessTokenKey);

        setIsLoading(true);
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: accessToken || '',
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    history.go();
                    return
                }

                console.error('Action failed')
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className={'flex flex-wrap items-center border rounded w-full justify-between p-2'}>
            <span className={'text-lg font-semibold'}>
                {filter}
            </span>
            <DeleteButton disabled={isLoading} onClick={handleOnClick} />
        </div>
    )
}

export default FilterContainer;