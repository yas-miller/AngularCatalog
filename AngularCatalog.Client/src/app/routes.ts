import { Route, Router, Routes } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Auth } from "./components/auth/auth.component";
import { Register } from "./components/register/register.component";
import { Account } from "./components/account/account.component";
import { AdminHome } from "./components/admin/adminHome/adminHome.component";
import { Catalog } from "./components/catalog/catalog.component";

export enum MenuItemAccess {
  Any,
  OnlyWithNoAuth,
  OnlyWithAuth,
  OnlyWithAuthAdmin
}
export interface MenuItemExtended extends MenuItem {

  access: MenuItemAccess
  visible: boolean
  path: string | undefined
}

export var routes: Routes = [
  {
    title: "Каталог",
    component: Catalog,
    path: "catalog",
  },
  {
    title: "Каталог",
    component: Catalog,
    path: "catalog/:productId",
  },
  {
    title: "Авторизация",
    component: Auth,
    path: "auth"
  },
  {
    title: "Регистрация",
    component: Register,
    path: "register"
  },
  {
    title: "Личный кабинет",
    component: Account,
    path: "account"
  },
  {
    title: "Администрирование",
    component: AdminHome,
    path: "adminHome"
  }];
export var menuItems: MenuItemExtended[] = routes.map(r => {
    return r != null ? routeToMenuItemExtended(r) : null;
  })
  .concat(routes.map(r => r.children).flat().map(rc => {
    return rc != null ? routeToMenuItemExtended(rc) : null;
  }))
  .filter(x => x != null);

function routeToMenuItemExtended(route: Route): MenuItemExtended {
  var icon!: string;
  var access: MenuItemAccess = MenuItemAccess.Any;
  var visible: boolean = true;
  switch (route.path) {
    case "catalog":
      icon = "pi pi-home";
      break;
    case "catalog/:productId":
      visible = false;
      break;
    case "auth":
      icon = "pi pi-sign-in";
      access = MenuItemAccess.OnlyWithNoAuth;
      break;
    case "register":
      icon = "pi pi-sign-in";
      access = MenuItemAccess.OnlyWithNoAuth;
      visible = false;
      break;
    case "account":
      icon = "pi pi-user";
      access = MenuItemAccess.OnlyWithAuth;
      break;
    case "adminHome":
      icon = "pi pi-pencil";
      access = MenuItemAccess.OnlyWithAuthAdmin;
      break;
  }
  return { label: route.title, title: route.title, path: route.path, routerLink: route.path, access: access, visible: visible, icon: icon } as MenuItemExtended;
}
