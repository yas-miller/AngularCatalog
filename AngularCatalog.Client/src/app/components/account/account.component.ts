import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../models/user';
import { UserService } from '../../../services/userservice';
import { BrowserModule } from '@angular/platform-browser';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { showError, showInfo } from '../../../state/base/actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: "Account",
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  imports: [InputTextModule,
    CommonModule,
    FloatLabelModule,
    FormsModule,
    ButtonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    RippleModule
  ]
})
export class Account implements OnInit {
  public oldPassword: string | undefined | null;
  public newPassword: string | undefined | null;

  constructor(private userService: UserService, private store: Store<any>, private router: Router) {
    
  }


  ngOnInit() {

  }


  async changePassword() {
    try {
      await this.userService!.changePassword(this.oldPassword!, this.newPassword!);

      this.resetPasswordsModels();
      this.store.dispatch(showInfo({ infoString: 'Пароль успешно обновлен' }));
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }

  async logOut() {
    try {
      await this.userService!.logOut();
      this.router!.navigate(['/']);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }


  resetPasswordsModels() {
    this.oldPassword = null;
    this.newPassword = null;
  }
}
