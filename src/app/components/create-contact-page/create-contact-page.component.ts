import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {ContactsService} from "../../services/contacts.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IContact} from "../../interfaces/contract.interface";
import {v4 as uuidv4} from 'uuid';
import {phoneValidationRegex} from '../../constants/regex';

@Component({
    selector: 'app-create-contact-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatLabel,
        MatInputModule,
        MatInput,
        MatFormField,
        MatButton,
        MatCard,
        MatCardContent
    ],
    templateUrl: './create-contact-page.component.html',
    styleUrl: './create-contact-page.component.scss'
})
export class CreateContactPageComponent implements OnInit {
    public contactForm!: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private contactsService: ContactsService,
                private router: Router,
                private snackBar: MatSnackBar,
    ) {
    }

    public ngOnInit(): void {
        this.contactForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern(phoneValidationRegex)]],
        });
    }

    public onSubmit() {
        if (this.contactForm.valid) {
            const uuid = uuidv4();
            const newContract: IContact = {id: uuid, ...this.contactForm.value};

            this.contactsService.creteNewContact(newContract);
            this.snackBar.open('Створено новий контакт!');

            this.router.navigate(['list-of-contacts']);
        } else {
            this.snackBar.open('Новий контакт не вдалось створити');
        }
    }
}
