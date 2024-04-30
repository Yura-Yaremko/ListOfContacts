import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfContactsPageComponent } from './list-of-contacts-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ListOfContactsPageComponent', () => {
  let component: ListOfContactsPageComponent;
  let fixture: ComponentFixture<ListOfContactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfContactsPageComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
