import { Component, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview'
import { SidebarModule } from 'primeng/sidebar';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/productsservice';
import { UserService } from '../../../services/userservice';
import { showError } from '../../../state/base/actions';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: "ShowProduct",
  templateUrl: './showProduct.component.html',
  styleUrl: './showProduct.component.css',
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
    SidebarModule,
    InputNumberModule,
    RouterModule
  ]
})
export class ShowProduct implements OnInit {
  @Input() product: Product | undefined

  public userAuthenticatedIsAdmin$: Observable<boolean>

  constructor(private productsService: ProductsService, private userService: UserService) {
    this.userAuthenticatedIsAdmin$ = userService.userAuthenticatedIsAdmin$;
  }


  ngOnInit() {
    
  }
}
