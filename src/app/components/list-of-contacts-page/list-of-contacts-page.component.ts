import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../../services/contacts.service";
import {MatCard, MatCardContent} from "@angular/material/card";
import {ContactCardComponent} from "../contact-card/contact-card.component";
import {CommonModule, NgForOf} from "@angular/common";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {PageEvent} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {IContact} from "../../interfaces/contract.interface";
import {Router} from "@angular/router";

@Component({
    selector: 'app-list-of-contacts-page',
    standalone: true,
    imports: [
        MatCard,
        ContactCardComponent,
        NgForOf,
        MatCardContent,
        MatInput,
        MatFormField,
        MatLabel,
        MatPaginator,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatButton,
    ],
    templateUrl: './list-of-contacts-page.component.html',
    styleUrl: './list-of-contacts-page.component.scss'
})
export class ListOfContactsPageComponent implements OnInit {
    public contacts: IContact[] = [];
    public filteredContacts: IContact[] = [];
    public pagedContacts: IContact[] = [];

    public searchTerm: string = '';
    public noSuchUser: boolean = false;

    public pageSize: number = 6;
    public currentPageIndex: number = 0;
    public totalContacts: number = 0;
    public emptyArrrayLenght: number = 0

    constructor(private contactsService: ContactsService, private router: Router) {
    }

    public ngOnInit() {
        this.contacts = this.contactsService.getAllContacts();
        this.totalContacts = this.contacts.length;
        this.updatePageData();
        this.filterContacts();
        this.contactsService.setContactsToStore();
    }

    public filterContacts(): void {
        this.noSuchUser = false;
        if (this.searchTerm.trim() === '') {
            this.filteredContacts = this.contacts;
            this.totalContacts = this.contacts.length;
        } else {
            this.filteredContacts = this.contacts.filter((contact: IContact) =>
                contact.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                contact.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
            if (this.filteredContacts.length === this.emptyArrrayLenght) {
                this.noSuchUser = true;
            }
            this.totalContacts = this.filteredContacts.length;
        }
        this.updatePageData();
    }

    public onPageChange(event: PageEvent): void {
        this.currentPageIndex = event.pageIndex;
        this.updatePageData();
    }

    public navigateToCreateContact(): void {
        this.router.navigate(['create-contact'])
    }

    public requestContacts(): void {
        this.contacts = this.contactsService.getAllContacts();
        this.updatePageData();
        this.filterContacts();
    }

    private updatePageData(): void {
        const startIndex = this.currentPageIndex * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.filteredContacts.length);
        this.pagedContacts = this.filteredContacts.slice(startIndex, endIndex);
    }
}
