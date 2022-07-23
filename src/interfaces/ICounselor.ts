import ICounsellingInfo from "./ICounsellingInfo";
import ISupervisingInfo from "./ISupervisingInfo";
import IProvinceAndCity from "./IProvinceAndCity";

export default interface ICounselor {
    user: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    pronouns: string;
    in_person: IProvinceAndCity | null;
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
    counselling: ICounsellingInfo | null;
    supervising: ISupervisingInfo | null;
}