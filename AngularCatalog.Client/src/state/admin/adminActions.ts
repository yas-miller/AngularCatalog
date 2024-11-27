import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export var setUsers = createAction("Set Users", props<{ users: User[] }>());
export var unsetUsers = createAction("Unset Users");

export var createUser = createAction("Create User", props<{ user: User }>());
export var updateUser = createAction("Update User", props<{ user: User }>());
export var deleteUser = createAction("Delete User", props<{ user: User }>());
export var blockUser = createAction("Block User", props<{ user: User }>());
export var unblockUser = createAction("Unblock User", props<{ user: User }>());
