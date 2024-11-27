import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview'
import { SidebarModule } from 'primeng/sidebar';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../../../../models/product';
import { showError, showInfo } from '../../../../state/base/actions';
import { UsersService } from '../../../../services/usersservice';
import { User } from '../../../../models/user';
import { Register } from "../../register/register.component";


@Component({
  standalone: true,
  selector: "CreateOrUpdateUser",
  templateUrl: './createOrUpdateUser.component.html',
  styleUrl: './createOrUpdateUser.component.css',
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
    TabViewModule,
    SidebarModule,
    InputNumberModule,
    Register
]
})
export class CreateOrUpdateUser implements OnInit {
  @Input() user: User | undefined | null = new User();
  @Input() sidebarVisible: boolean = false;
  @Output() sidebarVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public newPassword: string | undefined | null;


  constructor(private store: Store<any>, private usersService: UsersService) {

  }


  ngOnInit() {
    
  }


  async changePasswordForUser() {
    try {
      await this.usersService.changePassword(this.user!, null, this.newPassword!);

      this.resetNewPassword();

      this.sidebarVisible = false;
      this.sidebarVisibleChange.emit(false);
      this.store.dispatch(showInfo({ infoString: 'Пароль успешно обновлен' }));
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }

  resetNewPassword() {
    this.newPassword = null;
  }

  onHideSidebar(event: any) {
    this.sidebarVisibleChange.emit(false);
  }
}
