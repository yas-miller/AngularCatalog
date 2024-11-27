import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../../services/userservice';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview'
import { ProductsService } from '../../../../services/productsservice';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Catalog } from "../../catalog/catalog.component";
import { CreateOrUpdateProduct } from '../../createOrUpdateProduct/createOrUpdateProduct.component';
import { AdminShowUsers } from '../adminShowUsers/adminShowUsers.component';
import { AdminShowCategories } from '../adminShowCategories/adminShowCategories.component';

@Component({
  standalone: true,
  selector: "AdminHome",
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
  imports: [
    InputTextModule,
    CommonModule,
    FloatLabelModule,
    FormsModule,
    ButtonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    RippleModule,
    TabViewModule,
    Catalog,
    AdminShowCategories,
    AdminShowUsers
  ]
})
export class AdminHome implements OnInit {
  ngOnInit() {
    
  }
}
