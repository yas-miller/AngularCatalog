import {HttpClient, HttpParams} from "@angular/common/http";
import { State, Store, select } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { setCurrentUser, unsetCurrentUser } from "../state/base/actions";
import { EUserType } from "../models/Enums/eusertype";
import fetchApi from "../app/fetchApi";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public currentUser$: Observable<User | null>;
  public userIsAuthenticated$: Observable<boolean>;
  public userAuthenticatedIsAdmin$: Observable<boolean>;
  constructor(private store: Store<any>) {
    this.currentUser$ = store.pipe(select(state => state.storeBaseReducer.currentUser));
    this.userIsAuthenticated$ = this.currentUser$.pipe(map(cu => cu != null));
    this.userAuthenticatedIsAdmin$ = this.currentUser$.pipe(map(cu => cu != null && cu?.UserType > EUserType.User));
  }


  async isAuthenticated() {
    try {
      var req = fetchApi("/api/user/isAuthenticated", 'GET');

      var res = await req;
      if (res.status == 401) {
        throw new Error("Пользователь не авторизован");
      }
      else if (res.status == 403) {
        throw new Error("Прав пользователя недостаточно");
      }
      else if (res.status == 404) {
        throw new Error("Не удалось получить доступ к ресурсу, вероятно из-за блокировки");
      }
      var respJson = await res.json();
      if (respJson.status === 400) {
        throw new Error(respJson.title);
      }
      var result = respJson;

      var isAuthenticated = result.isAuthenticated;
      var currentUser = result.currentUser;
      var currentUserId = result.currentUserId;
      var currentUserRole = result.currentUserRole;

      if (isAuthenticated) {
        this.store.dispatch(setCurrentUser({ currentUser: currentUser ?? { Id: currentUserId, EUserType: EUserType[currentUserRole] } }));
      }
    }
    catch (error) {
      throw new Error("Ошибка при входе в систему" + " - " + error!.toString());
    }
  }
  async authorize(login: string, password: string) {
    try {
      var req = fetchApi("/api/user/authorize" + "?" + new URLSearchParams({
        login,
        password
      }).toString(), 'GET');

      var res = await req;
      if (res.status == 401) {
        throw new Error("Пользователь не авторизован");
      }
      else if (res.status == 403) {
        throw new Error("Прав пользователя недостаточно");
      }
      else if (res.status == 404) {
        throw new Error("Не удалось получить доступ к ресурсу, вероятно из-за блокировки");
      }
      var respJson = await res.json();
      if (respJson.status === 400) {
        throw new Error(respJson.title);
      }
      var loggedInUser = respJson;

      this.store.dispatch(setCurrentUser({ currentUser: loggedInUser }));
    }
    catch (error) {
      throw new Error("Ошибка при входе в систему" + " - " + error!.toString());
    }
  }
  async register(newUser: User) {
    try {
      var req = fetchApi("/api/user/register", 'POST', newUser);

      var res = await req;
      if (res.status == 401) {
        throw new Error("Пользователь не авторизован");
      }
      else if (res.status == 403) {
        throw new Error("Прав пользователя недостаточно");
      }
      else if (res.status == 404) {
        throw new Error("Не удалось получить доступ к ресурсу, вероятно из-за блокировки");
      }
      var respJson = await res.json();
      if (respJson.status === 400) {
        throw new Error(respJson.title);
      }
      var createdUser = respJson;

      this.store.dispatch(setCurrentUser({ currentUser: createdUser }));
    }
    catch (error) {
      throw new Error("Ошибка при регистрации в системе" + " - " + error!.toString());
    }
  }
  async logOut() {
    try {
      var req = fetchApi("/api/user/logOut", 'GET');

      var res = await req;
      if (res.status == 401) {
        throw new Error("Пользователь не авторизован");
      }
      else if (res.status == 403) {
        throw new Error("Прав пользователя недостаточно");
      }
      else if (res.status == 404) {
        throw new Error("Не удалось получить доступ к ресурсу, вероятно из-за блокировки");
      }

      this.store.dispatch(unsetCurrentUser());
    }
    catch (error) {
      throw new Error("Ошибка при выходе из системе" + " - " + error!.toString());
    }
  }
  async changePassword(oldPassword: string, newPassword: string) {
    try {
      var req = fetchApi("/api/user/changePassword" + "?" + new URLSearchParams({
        oldPassword,
        newPassword
      }).toString(), 'GET');

      var res = await req;
      if (res.status == 401) {
        throw new Error("Пользователь не авторизован");
      }
      else if (res.status == 403) {
        throw new Error("Прав пользователя недостаточно");
      }
      else if (res.status == 404) {
        throw new Error("Не удалось получить доступ к ресурсу, вероятно из-за блокировки");
      }
    }
    catch (error) {
      throw new Error("Ошибка при смене пароля" + " - " + error!.toString());
    }
  }
}
