import { Injectable } from "@angular/core";
import {FetchBackend, HttpClient, HttpParams} from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Product } from "../models/product";
import { createProduct, deleteProduct, setProducts, updateProduct } from "../state/base/actions";
import fetchApi from "../app/fetchApi";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private store: Store<any>) {

  }

  async getAllProducts(): Promise<Product[]> {
    try {
      var req = fetchApi("/api/products", 'GET');

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
      var products = respJson;

      this.store.dispatch(setProducts({ products: products }));
      return products;
    }
    catch (error) {
      throw new Error("Ошибка при получении всех продуктов" + " - " + error!.toString());
    }
  }
  async getProduct(id: Number): Promise<Product> {
    try {
      var req = fetchApi("/api/products/" + id, 'GET');

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
      var product = respJson;

      this.store.dispatch(updateProduct({ product: product }));
      return product;
    }
    catch (error) {
      throw new Error("Ошибка при получении продукта" + " - " + error!.toString());
    }
  }
  async createProduct(newProduct: Product): Promise<Product> {
    try {
      var req = fetchApi("/api/products", 'POST', newProduct);

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
      newProduct = respJson;

      this.store.dispatch(createProduct({ product: newProduct }));
      return newProduct;
    }
    catch (error) {
      throw new Error("Ошибка при создании продукта" + " - " + error!.toString());
    }
  }
  async updateProduct(product: Product): Promise<Product> {
    try {
      var req = fetchApi("/api/products", 'PUT', product);

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
      product = respJson;

      this.store.dispatch(updateProduct({ product: product }));
      return product;
    }
    catch (error) {
      throw new Error("Ошибка при изменении продукта" + " - " + error!.toString());
    }
  }
  async deleteProduct(product: Product): Promise<Product> {
    try {
      var req = fetchApi("/api/products/" + product.Id, 'DELETE', product);

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

      this.store.dispatch(deleteProduct({ product: product }));
      return product;
    }
    catch (error) {
      throw new Error("Ошибка при удалении продукта" + " - " + error!.toString());
    }
  }
}
