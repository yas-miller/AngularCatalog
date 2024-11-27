import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavTabMenu } from './components/navTabMenu/navTabMenu.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../services/userservice';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsService } from '../services/productsservice';
import { CategoriesService } from '../services/categoriesservice';
import { ToastGlobal } from './components/toastGlobal/toastGlobal.component';
import { select, Store } from '@ngrx/store';
import { showError } from '../state/base/actions';
import { UsersService } from '../services/usersservice';

@Component({
  standalone: true,
  selector: 'AppRoot',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HttpClientModule,
    RouterOutlet, 
    NavTabMenu,
    ToastGlobal
  ]
})
export class AppComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(private userService: UserService, private store: Store<any>, private productsService: ProductsService, private categoriesService: CategoriesService, private usersService: UsersService) {}


  async ngOnInit() {
    //Populate store
    try {
      await this.userService.isAuthenticated();

      this.userService.currentUser$.subscribe(async currentUser => {
        try {
          if (currentUser) {
            await this.loadData();
          }
        }
        catch (error) {
          this.store.dispatch(showError({ errorString: error?.toString() }));
        }
      });
      this.userService.userAuthenticatedIsAdmin$.subscribe(async userAuthenticatedIsAdmin => {
        try {
          if (userAuthenticatedIsAdmin) {
            await this.loadDataAdmin();
          }
        }
        catch (error) {
          this.store.dispatch(showError({ errorString: error?.toString() }));
        }
      });
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
    // 
  }

  async loadData() {
    await this.productsService.getAllProducts();
    await this.categoriesService.getAllCategories();  
  }
  async loadDataAdmin() {
    await this.usersService.getAllUsers();
  }
}
