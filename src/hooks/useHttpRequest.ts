import {useEffect, useState} from "react";

export interface IHttpReqObj {
    isLoading: boolean,
    isError: boolean,
    data: any,
    res: Response | null,
}

let timeout: number | undefined = undefined;
export default function useHttpRequest(url: RequestInfo, init?: RequestInit, trigger?: boolean) {
    const [state, setState] = useState<IHttpReqObj>({
        isLoading: true,
        isError: false,
        data: null,
        res: null,
    });

    useEffect(() => {
            setState({
                isLoading: true,
                isError: false,
                data: null,
                res: null,
            });
            clearTimeout(timeout);
            timeout = setTimeout(() => makeRequest(), 400)
        }, [url, trigger]
    );

    function makeRequest() {
        let newState: IHttpReqObj = {
            isLoading: false,
            isError: false,
            data: null,
            res: null
        }

        fetch(url, init)
            .then((res) => {
                newState.res = res;
                return res.json();
            })
            .then((data) => {
                newState.data = data;
                setState(newState);
            })
            .catch((error) => {
                newState.data = null;
                newState.isError = true;
                setState(newState);
            });

    }

    return state;
}