import { Injectable } from "@angular/core";
import {FetchBackend, HttpClient, HttpParams} from "@angular/common/http";
import { Store } from "@ngrx/store";
import fetchApi from "../app/fetchApi";
import { User } from "../models/user";
import { blockUser, createUser, deleteUser, setUsers, unblockUser, updateUser } from "../state/admin/adminActions";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private store: Store<any>) {

  }

  async getAllUsers(): Promise<User[]> {
    try {
      var req = fetchApi("/api/users", 'GET');

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
      var users = respJson;

      this.store.dispatch(setUsers({ users: users }));
      return users;
    }
    catch (error) {
      throw new Error("Ошибка при получении всех пользователей" + " - " + error!.toString());
    }
  }
  async getUser(id: Number): Promise<User> {
    try {
      var req = fetchApi("/api/users/" + id, 'GET');

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
      var user = respJson;

      this.store.dispatch(updateUser({ user: user }));
      return user;
    }
    catch (error) {
      throw new Error("Ошибка при получении пользователя" + " - " + error!.toString());
    }
  }
  async createUser(newUser: User): Promise<User> {
    try {
      var req = fetchApi("/api/users", 'POST', newUser);

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
      newUser = respJson;

      this.store.dispatch(createUser({ user: newUser }));
      return newUser;
    }
    catch (error) {
      throw new Error("Ошибка при создании пользователя" + " - " + error!.toString());
    }
  }
  async deleteUser(user: User): Promise<User> {
    try {
      var req = fetchApi("/api/users/" + user.Id, 'DELETE', user);

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

      this.store.dispatch(deleteUser({ user: user }));
      return user;
    }
    catch (error) {
      throw new Error("Ошибка при удалении пользователя" + " - " + error!.toString());
    }
  }

  async blockUser(user: User) {
    try {
      var req = fetchApi("/api/users/blockUser/" + user.Id, 'GET');

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

      this.store.dispatch(blockUser({ user: user }));
    }
    catch (error) {
      throw new Error("Ошибка при блокировке пароля" + " - " + error!.toString());
    }
  }
  async unblockUser(user: User) {
    try {
      var req = fetchApi("/api/users/unblockUser/" + user.Id, 'GET');

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

      this.store.dispatch(unblockUser({ user: user }));
    }
    catch (error) {
      throw new Error("Ошибка при разблокировке пароля" + " - " + error!.toString());
    }
  }
  async changePassword(user: User, oldPassword: string | null, newPassword: string) {
    try {
      var urlParams = new URLSearchParams();
      urlParams.append("userId", user!.Id!.toString());
      if (oldPassword) {
        urlParams.append("oldPassword", oldPassword);
      }
      urlParams.append("newPassword", newPassword);

      var req = fetchApi("/api/users/changePassword" + "?" + urlParams.toString(), 'GET');

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
