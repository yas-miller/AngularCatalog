import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import { Category } from "../../models/category";

export var showError = createAction("Show Error", props<{ errorString: string | null | undefined }>());
export var showInfo = createAction("Show Info", props<{ infoString: string | null | undefined }>());

export var setCurrentUser = createAction("Set Current user", props<{ currentUser: User | null }>());
export var unsetCurrentUser = createAction("Unset Current user");

export var setProducts = createAction("Set Products", props<{ products: Product[] }>());
export var unsetProducts = createAction("Unset Products");

export var setCategories = createAction("Set Categories", props<{ categories: Category[] }>());
export var unsetCategories = createAction("Unset Categories");

export var deleteProduct = createAction("Delete Product", props<{ product: Product }>());
export var createProduct = createAction("Create Product", props<{ product: Product }>());
export var updateProduct = createAction("Update Product", props<{ product: Product }>());

export var createCategory = createAction("Create Category", props<{ category: Category }>());
export var updateCategory = createAction("Update Category", props<{ category: Category }>());
export var deleteCategory = createAction("Delete Category", props<{ category: Category }>());
