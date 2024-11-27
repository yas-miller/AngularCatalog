import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { ProductImageUpload } from '../productImageUpload/productImageUpload.component';
import { showError } from '../../../state/base/actions';


@Component({
  standalone: true,
  selector: "CreateOrUpdateProduct",
  templateUrl: './createOrUpdateProduct.component.html',
  styleUrl: './createOrUpdateProduct.component.css',
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
    ProductImageUpload
  ]
})
export class CreateOrUpdateProduct implements OnInit {
  @Input() product: Product | undefined | null = new Product();
  @Input() sidebarVisible: boolean = false;
  @Output() sidebarVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public userAuthenticatedIsAdmin$: Observable<boolean>

  allCategories$: Observable<Category[]>


  constructor(private store: Store<any>, private productsService: ProductsService, private userService: UserService) {
    this.allCategories$ = store.pipe(select(store => store.storeBaseReducer.categories));
    this.userAuthenticatedIsAdmin$ = userService.userAuthenticatedIsAdmin$;
  }


  ngOnInit() {
    
  }


  async createOrUpdateProduct() {
    try {
      if (this.product!.Id) {
        await this.productsService.updateProduct(this.product!);
      }
      else {
        await this.productsService.createProduct(this.product!);
      }

      this.resetProduct();

      this.sidebarVisible = false;
      this.sidebarVisibleChange.emit(false);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }

  resetProduct() {
    this.product = new Product();
  }

  onHideSidebar(event: any) {
    this.sidebarVisibleChange.emit(false);
  }
}
