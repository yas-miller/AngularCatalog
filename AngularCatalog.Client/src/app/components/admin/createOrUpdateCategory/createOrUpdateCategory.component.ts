import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { Category } from '../../../../models/category';
import { CategoriesService } from '../../../../services/categoriesservice';
import { showError } from '../../../../state/base/actions';


@Component({
  standalone: true,
  selector: "CreateOrUpdateCategory",
  templateUrl: './createOrUpdateCategory.component.html',
  styleUrl: './createOrUpdateCategory.component.css',
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
    InputNumberModule
  ]
})
export class CreateOrUpdateCategory implements OnInit {
  @Input() category: Category | undefined | null = new Category();
  @Input() sidebarVisible: boolean = false;
  @Output() sidebarVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private store: Store<any>, private categoriesService: CategoriesService) {

  }


  ngOnInit() {
    
  }


  async createOrUpdateCategory() {
    try {
      if (this.category!.Id) {
        await this.categoriesService.updateCategory(this.category!);
      }
      else {
        await this.categoriesService.createCategory(this.category!);
      }

      this.resetCategoryModel();

      this.sidebarVisible = false;
      this.sidebarVisibleChange.emit(false);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }

  resetCategoryModel() {
    this.category = new Category();
  }

  onHideSidebar(event: any) {
    this.sidebarVisibleChange.emit(false);
  }
}
