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
import { RatingModule } from 'primeng/rating';
import { ProductsService } from '../../../services/productsservice';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Product } from '../../../models/product';
import { SelectItem } from 'primeng/api';
import { CreateOrUpdateProduct } from '../createOrUpdateProduct/createOrUpdateProduct.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { showError } from '../../../state/base/actions';
import { ShowProduct } from "../showProduct/showProduct.component";
import { CategoriesService } from '../../../services/categoriesservice';
import { Category } from '../../../models/category';
import { ShowProducts } from '../showProducts/showProducts.component';

@Component({
  standalone: true,
  selector: "Catalog",
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
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
    RatingModule,
    CreateOrUpdateProduct,
    RouterModule,
    ShowProduct,
    ShowProducts
]
})
export class Catalog implements OnInit {
  @Input() adminEdit: boolean = false;

  productId: Number | undefined;
  categoryId: Number | undefined;

  queriedProduct: Product | undefined;
  queriedCategory: Category | undefined;
  sortBy: string | undefined;
  filter: string | undefined;

  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private store: Store<any>, private activateRoute: ActivatedRoute) {
    this.products$ = store.pipe(select(store => store.storeBaseReducer.products));

    activateRoute.params.subscribe(async params => {
      this.productId = params["productId"]
      if (this.productId && (Number(this.productId) >= 0.0) && (Math.floor(Number(this.productId)) === Number(this.productId)) && Number(this.productId) !== Infinity) {
        await this.getProductById(this.productId)
      }
    });
    activateRoute.queryParams.subscribe(async queryParams => {
      this.sortBy = queryParams["sortBy"];
      this.filter = queryParams["filter"];

      this.categoryId = queryParams["categoryId"];
      if (this.categoryId && (Number(this.categoryId) >= 0.0) && (Math.floor(Number(this.categoryId)) === Number(this.categoryId)) && Number(this.categoryId) !== Infinity) {
        await this.getCategoryProducts(this.categoryId)
      }
    });

    /*this.filter$ = store.pipe(select(selectRouteParam('filter')));
    this.sortBy$ = store.pipe(select(selectRouteParam('sortBy')));*/
  }


  ngOnInit() {
    
  }


  async getProductById(id: Number) {
    try {
      this.queriedProduct = await this.productsService!.getProduct(id);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }

  async getCategoryProducts(id: Number) {
    try {
      this.queriedCategory = await this.categoriesService!.getCategory(id);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
}
