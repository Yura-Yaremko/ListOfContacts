import { TestBed } from '@angular/core/testing';
import { ContactsServiceMock } from './contacts.service.mock';

describe('ContactsService', () => {
  let service: ContactsServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all contacts', () => {
    const contacts = service.getAllContacts();
    expect(contacts.length).toBeGreaterThan(0);
  });

  it('should get contact by id', () => {
    const contact = service.getContactById("16fd2706-8baf-433b-82eb-8c7fada847da");
    expect(contact?.firstName).toBe("Іван");
  });

  it('should delete contact', () => {
    const initialLength = service.getAllContacts().length;
    service.deleteContact("16fd2706-8baf-433b-82eb-8c7fada847da");
    expect(service.getAllContacts().length).toBe(initialLength - 1);
  });

  it('should update contract', () => {
    const id = "16fd2706-8baf-433b-82eb-8c7fada847da";
    const updatedContact = {
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
      phoneNumber: "UpdatedPhoneNumber",
      birthDate: "1990-01-01",
      email: "updated@example.com",
      addressOfResidence: "Updated Address"
    };
    service.updateContract(id, updatedContact);
    const contact = service.getContactById(id);
    expect(contact?.firstName).toBe("UpdatedFirstName");
    expect(contact?.lastName).toBe("UpdatedLastName");
  });

  it('should create new contact', () => {
    const newContact = {
      id: "new-id",
      firstName: "NewFirstName",
      lastName: "NewLastName",
      phoneNumber: "NewPhoneNumber",
      birthDate: "1990-01-01",
      email: "new@example.com",
      addressOfResidence: "New Address"
    };
    service.createNewContact(newContact);
    const contact = service.getContactById("new-id");
    expect(contact).toBeTruthy();
  });
});
