import CounsellingInfo from "./CounsellingInfo";
import SupervisingInfo from "./SupervisingInfo";
import ProvinceAndCity from "./ProvinceAndCity";

export default interface Counselor {
    user: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    pronouns: string;
    in_person: ProvinceAndCity | null;
    languages: string[];
    specializations: string[];
    specializationDesc: string;
    approach: string[];
    approachDesc: string;
    credentials: string[];
    pfp: string;
    descriptionLong: string;
    introduction: string;
    janeId: number | null;
    counselling: CounsellingInfo | null;
    supervising: SupervisingInfo | null;
}