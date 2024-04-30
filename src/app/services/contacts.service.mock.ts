import { Injectable } from '@angular/core';
import { IContact, ICreateOrUpdateContact } from "../interfaces/contract.interface";

@Injectable({
    providedIn: 'root'
})
export class ContactsServiceMock {
    public contacts: IContact[] = [];

    constructor() {
        this.contacts = [
            {
                id: "16fd2706-8baf-433b-82eb-8c7fada847da",
                firstName: "Іван",
                lastName: "Петров",
                phoneNumber: "0987654321",
                birthDate: "1995-03-20",
                email: "ivan@example.com",
                addressOfResidence: "вул. Пушкіна, 10, м. Київ"
            },
            {
                id: "51e06255-1757-47cc-8a1f-eb3a531a2b95",
                firstName: "Марія",
                lastName: "Іваненко",
                phoneNumber: "0671234567",
                birthDate: "1988-11-15",
                email: "maria@example.com",
                addressOfResidence: "вул. Шевченка, 15, м. Львів"
            },
        ];
    }

    public getAllContacts(): IContact[] {
        return this.contacts;
    }

    public getContactById(id: string): IContact | undefined {
        return this.contacts.find(contact => contact.id === id);
    }

    public deleteContact(id: string): void {
        this.contacts = this.contacts.filter(contact => contact.id !== id);
    }

    public updateContract(id: string, contract: ICreateOrUpdateContact): void {
        const index = this.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            this.contacts[index] = { id, ...contract };
        } else {
            this.contacts.push({ id, ...contract });
        }
    }

    public createNewContact(contact: IContact): void {
        this.contacts.push(contact);
    }
}
