import {
    array,
    number,
    object,
    optional,
    string,
    union,
    null as zNull,
    TypeOf,
    ZodErrorMap,
    ZodIssueCode,
    setErrorMap
} from "zod";

export const PutCounselorFormSchema = object({
    age: number({invalid_type_error: 'This field is required'}).min(19, 'Minimum age is 19').max(100, 'Maximum age is 100'),
    janeId: optional(union([number(), zNull(), string().max(0, 'This is a number field')])),
    gender: string({invalid_type_error: 'This field is required'}),
    pronouns: string({invalid_type_error: 'This field is required'}),
    languages: optional(array(string())),
    specializations: optional(array(string())),
    approach: optional(array(string())),
    approachDesc: optional(string()),
    credentials: optional(array(string())),
    pfp: optional(string()),
    descriptionLong: optional(string()),
    introduction: optional(string()),
    in_person: optional(union([
        object({
            city: string(),
            province: string()
        }),
        zNull()
    ])),
    geolocation: optional(union([
        object({latitude: number(), longitude: number(), name: string()}),
        zNull()
    ])),
    counselling: optional(union([
        object({
            minPrice: number({invalid_type_error: 'This field is required'}).min(0, 'Cost per session cannot be negative'),
            maxPrice: number({invalid_type_error: 'This field is required'}).min(0, 'Cost per session cannot be negative')
        }),
        zNull()
    ])),
    supervising: optional(union([
        object({
            minPrice: number({invalid_type_error: 'This field is required'}).min(0, 'Cost per session cannot be negative'),
            maxPrice: number({invalid_type_error: 'This field is required'}).min(0, 'Cost per session cannot be negative'),
            occupancy: number({invalid_type_error: 'This field is required'}).min(0, 'Max occupancy cannot be negative')
        }),
        zNull()
    ])),
});

export type IPutCounselorForm = TypeOf<typeof PutCounselorFormSchema>;