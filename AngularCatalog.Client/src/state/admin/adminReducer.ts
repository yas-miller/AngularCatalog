import { Action, ActionCreator, createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import { Product } from "../../models/product";
import { blockUser, unblockUser, createUser, deleteUser, setUsers, unsetUsers, updateUser } from "./adminActions";

export class AdminState {
  users: User[] | undefined | null = null
}

const initialState: AdminState = new AdminState()

export var storeAdminReducer = createReducer(initialState,
  on(setUsers, (state, { users }) => {
    return {
      ...state,
      users
    };
  }),
  on(unsetUsers, (state) => {
    return {
      ...state,
      users: null
    };
  }),
  on(createUser, (state, { user }) => {
    return {
      ...state,
      users: state.users!.concat([user])
    };
  }),
  on(updateUser, (state, { user }) => {
    var updatedUsers = structuredClone(state.users);
    var val = updatedUsers?.find(u => u.Id === user.Id);
    if (val) {
      var index = updatedUsers?.indexOf(val);
      if (index != null && index !== -1) {
        updatedUsers![index] = user;
      }
      return {
        ...state,
        users: updatedUsers
      };
    }

    return state;
  }),
  on(deleteUser, (state, { user }) => {
    var updatedUsers = structuredClone(state.users);
    var val = updatedUsers?.find(u => u.Id === user.Id);
    if (val) {
      var index = updatedUsers?.indexOf(val);
      if (index != null && index !== -1) {
        updatedUsers!.splice(index, 1);
      }
      return {
        ...state,
        users: updatedUsers
      };
    }
    else {
      return state;
    }
  }),
  on(blockUser, (state, { user }) => {
    var updatedUsers = structuredClone(state.users);
    var val = updatedUsers?.find(u => u.Id === user.Id);
    if (val) {
      var index = updatedUsers?.indexOf(val);
      if (index != null && index !== -1) {
        updatedUsers![index].IsBlocked = true;
      }
      return {
        ...state,
        users: updatedUsers
      };
    }
    else {
      return state;
    }
  }),
  on(unblockUser, (state, { user }) => {
    var updatedUsers = structuredClone(state.users);
    var val = updatedUsers?.find(u => u.Id === user.Id);
    if (val) {
      var index = updatedUsers?.indexOf(val);
      if (index != null && index !== -1) {
        updatedUsers![index].IsBlocked = false;
      }
      return {
        ...state,
        users: updatedUsers
      };
    }
    else {
      return state;
    }
  })
);
