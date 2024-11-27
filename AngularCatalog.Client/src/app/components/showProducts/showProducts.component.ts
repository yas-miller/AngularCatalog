import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { select, Store } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/productsservice';
import { UserService } from '../../../services/userservice';
import { showError } from '../../../state/base/actions';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { CreateOrUpdateProduct } from '../createOrUpdateProduct/createOrUpdateProduct.component';


@Component({
  standalone: true,
  selector: "ShowProducts",
  templateUrl: './showProducts.component.html',
  styleUrl: './showProducts.component.css',
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
    RouterModule,
    CreateOrUpdateProduct
  ]
})
export class ShowProducts implements OnInit, OnChanges {
  @Input() adminEdit: boolean = false
  @Input() products: Product[] | undefined
  productsCopyList: Product[] | undefined

  productToEdit: Product | undefined
  sidebarVisible: boolean = false;

  @Input() sortBy: string | undefined;
  @Input() filter: string | undefined;

  sortOptions: SelectItem[] = [
    { label: 'По убыванию', value: '!PriceRubles' },
    { label: 'По возрастанию', value: 'PriceRubles' }
  ];
  sortOrder: number | undefined;
  sortField: string | undefined
  filterByField: string = "Name"

  constructor(private primengConfig: PrimeNGConfig, private store: Store<any>, private productsService: ProductsService) {
    this.primengConfig.ripple = true;
  }


  ngOnInit() {
    this.productsCopyList = structuredClone(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productsCopyList = structuredClone(this.products);
  }


  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
  onFilter(event: any, dv: any) {
    dv.filter(event.target.value, 'contains');
  }


  async showUpdateProduct(product: Product) {
    try {
      this.productToEdit = product;
      this.sidebarVisible = true;
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
  async deleteProduct(product: Product) {
    try {
      await this.productsService.deleteProduct(product);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
}
