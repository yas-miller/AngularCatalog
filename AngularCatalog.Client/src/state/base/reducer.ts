import { createReducer, on } from "@ngrx/store";
import { createCategory, createProduct, deleteCategory, deleteProduct, setCategories, setCurrentUser, setProducts, showError, showInfo, unsetCategories, unsetCurrentUser, unsetProducts, updateCategory, updateProduct } from "./actions";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import { Category } from "../../models/category";

export class BaseState {
  currentUser: User | undefined | null = null
  products: Product[] | undefined | null = null
  categories: Category[] | undefined | null = null
  infoStr: string | null = null
  errorStr: string | null = null
}

const initialState: BaseState = new BaseState()

export var storeBaseReducer = createReducer(initialState,
  on(setCurrentUser, (state, { currentUser }) => {
    return {
      ...state,
      currentUser
    }
  }),
  on(unsetCurrentUser, (state) => {
    return {
      ...state,
      currentUser: null
    }
  }),
  on(setProducts, (state, { products }) => {
    return {
      ...state,
      products
    };
  }),
  on(unsetProducts, (state) => {
    return {
      ...state,
      products: null
    };
  }),
  on(setCategories, (state, { categories }) => {
    return {
      ...state,
      categories
    };
  }),
  on(unsetCategories, (state) => {
    return {
      ...state,
      categories: null
    };
  }),
  on(createProduct, (state, { product }) => {
    return {
      ...state,
      products: state.products!.concat([product])
    };
  }),
  on(updateProduct, (state, { product }) => {
    var updatedProducts = structuredClone(state.products);
    var val = updatedProducts?.find(p => p.Id === product.Id);
    if (val) {
      var index = updatedProducts?.indexOf(val);
      if (index != null && index !== -1) {
        updatedProducts![index] = product;
      }
      return {
        ...state,
        products: updatedProducts
      };
    }
    else {
      return state;
    }
  }),
  on(deleteProduct, (state, { product }) => {
    var updatedProducts = structuredClone(state.products);
    var val = updatedProducts?.find(p => p.Id === product.Id);
    if (val) {
      var index = updatedProducts?.indexOf(val);
      if (index != null && index !== -1) {
        updatedProducts!.splice(index, 1);
      }
      return {
        ...state,
        products: updatedProducts
      };
    }
    else {
      return state;
    }
  }),
  on(createCategory, (state, { category }) => {
    return {
      ...state,
      categories: state.categories!.concat([category])
    };
  }),
  on(updateCategory, (state, { category }) => {
    var updatedCategories = structuredClone(state.categories);
    var val = updatedCategories?.find(c => c.Id === category.Id);
    if (val) {
      var index = updatedCategories?.indexOf(val);
      if (index != null && index !== -1) {
        updatedCategories![index] = category;
      }
      return {
        ...state,
        categories: updatedCategories
      };
    }
    else {
      return state;
    }
  }),
  on(deleteCategory, (state, { category }) => {
    var updatedCategories = structuredClone(state.categories);
    var val = updatedCategories?.find(c => c.Id === category.Id);
    if (val) {
      var index = updatedCategories?.indexOf(val);
      if (index != null && index !== -1) {
        updatedCategories!.splice(index, 1);
      }
      return {
        ...state,
        categories: updatedCategories
      };
    }
    else {
      return state;
    }
  }),
  on(showInfo, (state, { infoString }) => {
    return {
      ...state,
      infoString
    }
  }),
  on(showError, (state, { errorString }) => {
    return {
      ...state,
      errorString
    }
  })
);
