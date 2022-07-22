import React from "react";

export interface IHttpReqObj {
    isLoading: boolean,
    isError: boolean,
    data: any,
    res: Response | null,
}

export default function useHttpRequest(url?: RequestInfo, init?: RequestInit, trigger?: boolean) {
    const [state, setState] = React.useState<IHttpReqObj>({
        isLoading: false,
        isError: false,
        data: null,
        res: null,
    });

    React.useEffect(() => {
            if (typeof url !== 'undefined') {
                setState({
                    isLoading: true,
                    isError: false,
                    data: null,
                    res: null,
                });

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

        }, [url, trigger]
    );

    return state;
}