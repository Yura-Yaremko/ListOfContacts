import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCard, MatCardContent} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {Router} from "@angular/router";
import {ContactsService} from "../../services/contacts.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IContact} from '../../interfaces/contract.interface';
import {v4 as uuidv4} from 'uuid';
import {phoneValidationRegex} from '../../constants/regex';

@Component({
    selector: 'app-edit-contact',
    standalone: true,
    imports: [
        MatFormField,
        MatDatepickerToggle,
        MatDatepicker,
        MatInput,
        FormsModule,
        MatCardContent,
        MatCard,
        CommonModule,
        ReactiveFormsModule,
        MatLabel,
        MatButton,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './edit-contact.component.html',
    styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent implements OnInit {
    public editContactForm!: FormGroup;
    public contact!: IContact | undefined;

    @Input() id: string = ''

    constructor(private formBuilder: FormBuilder,
                private contactsService: ContactsService,
                private router: Router,
                private snackBar: MatSnackBar,
    ) {
    }

    public ngOnInit(): void {
        this.editContactForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern(phoneValidationRegex)]],
            email: ['', [Validators.email]],
            birthDate: [''],
            addressOfResidence: ['']
        });

        this.contact = this.contactsService.getContactById(this.id) ? this.contactsService.getContactById(this.id) : {
            id: uuidv4(),
            firstName: '',
            lastName: '',
            phoneNumber: '',
        };


        if (this.contact) {
            this.editContactForm.patchValue({
                firstName: this.contact.firstName,
                lastName: this.contact.lastName,
                phoneNumber: this.contact.phoneNumber,
                email: this.contact.email ? this.contact.email : '',
                birthDate: this.contact.birthDate ? this.contact.birthDate : '',
                addressOfResidence: this.contact.addressOfResidence ? this.contact.addressOfResidence : ''
            })
        }
    }

    public onSubmit(): void {
        if (this.editContactForm.valid) {
            this.contactsService.updateContract(this.id, this.editContactForm.value);
            this.snackBar.open('Контакт було зредаговано!');

            this.router.navigate(['list-of-contacts']);
        } else {
            this.snackBar.open('Контакт не було зредаговано!');
        }
    }
}
