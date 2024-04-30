import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {ContactsService} from "../../services/contacts.service";
import {IContact} from "../../interfaces/contract.interface";

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatButton
  ],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  @Input() contact!: IContact;
  @Output() updateContacts = new EventEmitter();

  constructor(private router: Router, private contactsService: ContactsService,) {
  }

  public navigateToAboutContactPage(id: string): void {
    this.router.navigate(['about-contact', id]);
  }

  public navigateToEditContactPage(id: string): void {
    this.router.navigate(['edit-contact', id]);
  }

  public deleteContact(id: string): void {
    this.contactsService.deleteContact(id);
    this.updateContacts.emit()
  }
}
