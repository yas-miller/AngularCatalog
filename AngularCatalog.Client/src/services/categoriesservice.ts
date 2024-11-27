import { Injectable } from "@angular/core";
import { User } from "../models/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Category } from "../models/category";
import { createCategory, deleteCategory, setCategories, updateCategory } from "../state/base/actions";
import fetchApi from "../app/fetchApi";

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private store: Store<any>) {

  }

  async getAllCategories(): Promise<Category[]> {
    try {
      var req = fetchApi("/api/categories", 'GET');

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
      var categories = respJson;

      this.store.dispatch(setCategories({ categories: categories }));
      return categories;
    }
    catch (error) {
      throw new Error("Ошибка при получении всех категорий" + " - " + error!.toString());
    }
  }
  async getCategory(id: Number): Promise<Category> {
    try {
      var req = fetchApi("/api/categories/" + id, 'GET');

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
      var category = respJson;

      this.store.dispatch(updateCategory({ category: category }));
      return category;
    }
    catch (error) {
      throw new Error("Ошибка при получении категории" + " - " + error!.toString());
    }
  }
  async createCategory(newCategory: Category): Promise<Category> {
    try {
      var req = fetchApi("/api/categories", 'POST', newCategory);

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
      newCategory = respJson;

      this.store.dispatch(createCategory({ category: newCategory }));
      return newCategory;
    }
    catch (error) {
      throw new Error("Ошибка при создании категории" + " - " + error!.toString());
    }
  }
  async updateCategory(category: Category): Promise<Category> {
    try {
      var req = fetchApi("/api/categories", 'PUT', category);

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
      category = respJson;

      this.store.dispatch(updateCategory({ category: category }));
      return category;
    }
    catch (error) {
      throw new Error("Ошибка при изменении категории" + " - " + error!.toString());
    }
  }
  async deleteCategory(category: Category): Promise<Category> {
    try {
      var req = fetchApi("/api/categories/" + category.Id, 'DELETE', category);

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

      this.store.dispatch(deleteCategory({ category: category }));
      return category;
    }
    catch (error) {
      throw new Error("Ошибка при удалении категории" + " - " + error!.toString());
    }
  }
}
