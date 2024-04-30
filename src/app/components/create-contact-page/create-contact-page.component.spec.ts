import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactPageComponent } from './create-contact-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CreateContactPageComponent', () => {
  let component: CreateContactPageComponent;
  let fixture: ComponentFixture<CreateContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContactPageComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
