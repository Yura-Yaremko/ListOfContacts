import { Injectable } from '@angular/core';
import {IContact, ICreateOrUpdateContact} from "../interfaces/contract.interface";
import {CONTACTS} from "../data/data";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public contacts: IContact[] = CONTACTS;

  public nameOfContactKey = 'allContacts'

  public setContactsToStore(): void {
    const contactsJson = JSON.stringify(this.contacts);

    localStorage.setItem(this.nameOfContactKey, contactsJson);
  }

  public getAllContacts(): IContact[] {
    const contactsJson = localStorage.getItem(this.nameOfContactKey);

    if (contactsJson) {
      this.contacts = JSON.parse(contactsJson);
    } else {
      this.contacts = CONTACTS;
    }

    return this.contacts
  }

  public getContactById(id: string): IContact | undefined {
    return this.getAllContacts().find((element: IContact) => element.id === id)
  }

  public deleteContact(id: string): void {
    this.contacts = this.getAllContacts().filter((element: IContact) => element.id !== id);

    this.setContactsToStore();
  }

  public updateContract(id: string, contract: ICreateOrUpdateContact): void {
    this.contacts = this.getAllContacts().map((element: IContact) => {
      if(element.id === id) {
        return {id, ...contract}
      } else {
        return element
      }
    })

    if (this.contacts.find((element: IContact) => element.id === id) === undefined) {
      this.contacts = [...this.contacts, {id, ...contract}]
    }

    this.setContactsToStore();
  }
  public creteNewContact(contract: IContact): void {
    this.contacts = [...this.getAllContacts(), contract];

    this.setContactsToStore();
  }
}
