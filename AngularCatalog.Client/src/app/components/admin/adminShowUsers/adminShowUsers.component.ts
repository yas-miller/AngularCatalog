import { Component, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { User } from '../../../../models/user';
import { select, Store } from '@ngrx/store';
import { UsersService } from '../../../../services/usersservice';
import { Observable } from 'rxjs';
import { showError } from '../../../../state/base/actions';
import { CreateOrUpdateUser } from '../createOrUpdateUser/createOrUpdateUser.component';

@Component({
  standalone: true,
  selector: "AdminShowUsers",
  templateUrl: './adminShowUsers.component.html',
  styleUrl: './adminShowUsers.component.css',
  imports: [
    InputTextModule,
    CommonModule,
    FloatLabelModule,
    FormsModule,
    ButtonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    RippleModule,
    RatingModule,
    CreateOrUpdateUser
]
})
export class AdminShowUsers implements OnInit {
  allUsers$: Observable<User[]>;
  users: User[] | undefined;
  usersCopyList: User[] | undefined


  userToEdit: User | undefined
  sidebarVisible: boolean = false;

  constructor(private usersService: UsersService, private store: Store<any>) {
    this.allUsers$ = store.pipe(select(store => store.storeAdminReducer.users));
    this.allUsers$.subscribe(allUsers => {
      this.users = allUsers;
      this.usersCopyList = structuredClone(this.users);
    })
  }


  ngOnInit() {
    
  }

  
  async showUpdateUser(user: User) {
    try {
      this.userToEdit = user;
      this.sidebarVisible = true;
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
  async blockUser(user: User) {
    try {
      await this.usersService.blockUser(user);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
  async unblockUser(user: User) {
    try {
      await this.usersService.unblockUser(user);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
  async deleteUser(user: User) {
    try {
      await this.usersService.deleteUser(user);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
}
