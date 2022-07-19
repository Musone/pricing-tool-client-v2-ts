import React from "react";

export interface HttpReqObj {
    isLoading: boolean,
    isError: boolean,
    data: any,
    res: Response | null,

}

export default function useHttpRequest(url?: RequestInfo, init?: RequestInit, trigger?: boolean) {
    const [state, setState] = React.useState<HttpReqObj>({
        isLoading: false,
        isError: false,
        data: null,
        res: null,
    });

    React.useEffect(() => {
            if (typeof url !== 'undefined') {
                // console.debug(`making request to: ${url}`);
                setState({
                    isLoading: true,
                    isError: false,
                    data: null,
                    res: null,
                });

                let newState: HttpReqObj = {
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

                        // alert('error being sent from httpRequest');
                    });
            } else {
                // console.debug('Tried to make a request to an undefined url')
            }

        }, [url, trigger]
    );

    return state;
}