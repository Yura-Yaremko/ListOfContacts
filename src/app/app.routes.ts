import { Routes } from '@angular/router';
import {ListOfContactsPageComponent} from "./components/list-of-contacts-page/list-of-contacts-page.component";
import {CreateContactPageComponent} from "./components/create-contact-page/create-contact-page.component";
import {AboutContactComponent} from "./components/about-contact/about-contact.component";
import {EditContactComponent} from "./components/edit-contact/edit-contact.component";

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'list-of-contacts'},
    {path: 'list-of-contacts', component: ListOfContactsPageComponent},
    {path: 'create-contact', component: CreateContactPageComponent},
    {path: 'about-contact/:id', component: AboutContactComponent},
    {path: 'edit-contact/:id', component: EditContactComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'list-of-contacts'},
];
