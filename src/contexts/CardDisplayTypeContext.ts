import {createContext, Dispatch, SetStateAction} from "react";
import DisplayType from "../enums/DisplayType";

const CardDisplayTypeContext = createContext<[DisplayType, Dispatch<SetStateAction<DisplayType>> | null]>([DisplayType.Counselor, null]);

export default CardDisplayTypeContext;