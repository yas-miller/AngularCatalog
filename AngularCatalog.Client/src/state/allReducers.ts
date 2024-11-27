import { storeAdminReducer } from "./admin/adminReducer";
import { storeBaseReducer } from "./base/reducer";

export class AllReducers {
  storeBaseReducer = storeBaseReducer;
  storeAdminReducer = storeAdminReducer
}

export var allReducers: AllReducers = new AllReducers();
