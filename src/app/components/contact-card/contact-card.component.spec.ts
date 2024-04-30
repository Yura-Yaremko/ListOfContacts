import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardComponent } from './contact-card.component';

describe('ContactCardComponent', () => {
  let component: ContactCardComponent;
  let fixture: ComponentFixture<ContactCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactCardComponent);
    component = fixture.componentInstance;

    component.contact = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      addressOfResidence: '123 Main St'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
