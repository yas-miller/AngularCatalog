import { Component, OnInit } from '@angular/core';
import { MenuItemAccess, MenuItemExtended, menuItems } from '../../routes';
import { Route, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { TabMenuModule } from "primeng/tabmenu";
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from '../../../models/user';
import { UserService } from '../../../services/userservice';

@Component({
  standalone: true,
  selector: "NavTabMenu",
  templateUrl: './navTabMenu.component.html',
  styleUrl: './navTabMenu.component.css',
  imports: [CommonModule,
    TabMenuModule,
    ButtonModule,
    RouterLink, 
    RouterLinkActive,
    SidebarModule
  ]
})
export class NavTabMenu implements OnInit {
  MenuItemAccess = MenuItemAccess;
  menuItems: MenuItemExtended[] = menuItems;

  sidebarVisible: boolean = false;

  public userIsAuthenticated$: Observable<boolean>
  public userAuthenticatedIsAdmin$: Observable<boolean>

  constructor(private userService: UserService) {
    this.userIsAuthenticated$ = userService.userIsAuthenticated$;
    this.userAuthenticatedIsAdmin$ = userService.userAuthenticatedIsAdmin$;
  }


  ngOnInit() {

  }
}
