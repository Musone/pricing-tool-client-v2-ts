import {createContext, Dispatch, SetStateAction} from "react";
import {UserObj} from "../App";

const UserContext = createContext<[UserObj | null, Dispatch<SetStateAction<UserObj | null>> | null]>([null, null]);

export default UserContext;