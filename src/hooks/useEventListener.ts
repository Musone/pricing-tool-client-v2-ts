import {MutableRefObject, useEffect, useRef} from "react";


const useEventListener = (eventType = '', listener: CallableFunction, options?: AddEventListenerOptions) => {
    const savedListener: MutableRefObject<Function> = useRef(() => null);

    useEffect(() => {
        savedListener.current = listener;
    }, [listener])

    useEffect(() => {
        const eventListener = (event: any) => savedListener.current(event);

        document.addEventListener(eventType, eventListener, options);

        return () => {
            document.removeEventListener(eventType, eventListener, options);
        }
    }, [eventType, savedListener, options])
}

export default useEventListener;