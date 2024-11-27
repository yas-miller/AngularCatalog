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
import { RatingModule } from 'primeng/rating';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoriesService } from '../../../../services/categoriesservice';
import { CreateOrUpdateCategory } from "../createOrUpdateCategory/createOrUpdateCategory.component";
import { showError } from '../../../../state/base/actions';

@Component({
  standalone: true,
  selector: "AdminShowCategories",
  templateUrl: './adminShowCategories.component.html',
  styleUrl: './adminShowCategories.component.css',
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
    CreateOrUpdateCategory
]
})
export class AdminShowCategories implements OnInit {
  allCategories$: Observable<Category[]>;
  categories: Category[] | undefined;
  categoriesCopyList: Category[] | undefined


  categoryToEdit: Category | undefined
  sidebarVisible: boolean = false;
  
  constructor(private categoriesService: CategoriesService, private store: Store<any>) {
    this.allCategories$ = store.pipe(select(store => store.storeBaseReducer.categories));
    this.allCategories$.subscribe(allCategories => {
      this.categories = allCategories;
      this.categoriesCopyList = structuredClone(this.categories);
    })
  }


  ngOnInit() {

  }


  async showUpdateCategory(category: Category) {
    try {
      this.categoryToEdit = category;
      this.sidebarVisible = true;
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
  async deleteCategory(category: Category) {
    try {
      await this.categoriesService.deleteCategory(category);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
}
