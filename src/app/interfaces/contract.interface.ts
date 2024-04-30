export interface IContact extends ICreateOrUpdateContact{
    id: string;
}

export interface ICreateOrUpdateContact {
    firstName: string;
    lastName: string;
    phoneNumber: number | string;
    birthDate?: Date | string;
    email?: string;
    addressOfResidence?: string;
}
