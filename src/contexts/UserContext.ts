import {createContext, Dispatch, SetStateAction} from "react";
import IUserObj from "../components/lists/interfaces/IUserObj";

const UserContext = createContext<[IUserObj | null, Dispatch<SetStateAction<IUserObj | null>> | null]>([null, null]);

export default UserContext;