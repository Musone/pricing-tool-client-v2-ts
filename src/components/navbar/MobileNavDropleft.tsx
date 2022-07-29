import React, {FunctionComponent, ReactElement, useRef, useState} from "react";
import useEventListener from "../../hooks/useEventListener";
import NavbarLinkButtonList from "./NavbarLinkButtonList";

const MobileNavDropleft: FunctionComponent = (): ReactElement => {
    const dropLeftRef = useRef<HTMLDivElement>(null);

    /**
     * Stores the last focused element in a global variable. Useful for deciding whether to focus or unfocus dropdown menus.
     */
    const [lastFocusedElement, setLastFocusedElement] = useState<Element | null>(null);
    useEventListener(
        'mousedown',
        () => {
            setLastFocusedElement(document.activeElement);
        },
    );

    function handleDropleftClick() {
        if (dropLeftRef !== null && lastFocusedElement !== dropLeftRef.current) {
            dropLeftRef.current?.focus();
        }
    }

    return (
        <>
            <button
                className={'lg:hidden w-16 rounded-3xl border-2 border-secondary_2 hover:brightness-125 shadow-2xl p-3'}
                onClick={handleDropleftClick}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 1H3a3 3 0 0 0 0 6h18a3 3 0 0 0 0-6Zm0 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2ZM21 17H3a3 3 0 0 0 0 6h18a3 3 0 0 0 0-6Zm0 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2ZM21 9H3a3 3 0 0 0 0 6h18a3 3 0 0 0 0-6Zm0 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2Z"
                        fill="#458ccc" className="fill-232323"></path>
                </svg>
            </button>

            <div
                tabIndex={-1}
                ref={dropLeftRef}
                className={'focus:outline-none absolute top-28 right-0 max-w-0 focus-within:max-w-screen-2xl h-max lg:max-w-0 transition-[max-width] ease-in-out duration-500 overflow-hidden rounded-bl-3xl shadow-xl'}>
                <div
                    className={'bg-gradient-to-b from-neutral-300/80 to-neutral-200 px-5 lg:h-0 flex flex-col items-center shadow-2xl'}>
                    <NavbarLinkButtonList className={'flex w-fit flex-col items-end py-10 pr-5 '}/>
                </div>
            </div>
        </>
    )
}

export default MobileNavDropleft;