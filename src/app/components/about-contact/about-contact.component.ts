import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";
import {AsyncPipe, CommonModule, DatePipe, JsonPipe, NgIf} from "@angular/common";
import {ContactsService} from "../../services/contacts.service";
import {MatButton} from "@angular/material/button";
import {IContact} from "../../interfaces/contract.interface";

@Component({
    selector: 'app-about-contact',
    standalone: true,
    imports: [
        CommonModule,
        MatCard,
        MatCardContent,
        AsyncPipe,
        JsonPipe,
        MatButton,
        NgIf,
        DatePipe
    ],
    templateUrl: './about-contact.component.html',
    styleUrl: './about-contact.component.scss'
})
export class AboutContactComponent implements OnInit {
    @Input() id: string = ''

    public contact!: IContact | undefined;

    constructor(private contactsService: ContactsService, private router: Router) {
    }

    public ngOnInit() {
        this.contact = this.contactsService.getContactById(this.id);
    }

    public navigateToEditContactPage(id: number | string): void {
        this.router.navigate(['edit-contact', id]);
    }

    public deleteContact(id: string): void {
        this.contactsService.deleteContact(id);
        this.router.navigate(['list-of-contacts']);
    }

    public navigateToCreateContact(): void {
        this.router.navigate(['create-contact'])
    }
}
