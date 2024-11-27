import { Component, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../models/user';
import { UserService } from '../../../services/userservice';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { showError } from '../../../state/base/actions';
import { DropdownModule } from 'primeng/dropdown';
import { EUserType } from '../../../models/Enums/eusertype';

@Component({
  standalone: true,
  selector: "Register",
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [InputTextModule, 
    CommonModule, 
    FloatLabelModule, 
    FormsModule, 
    ButtonModule,
    DropdownModule
  ]
})
export class Register implements OnInit {
  @Input() adminEdit: boolean = false;

  public newUser: User = new User();

  userTypes: any[]

  constructor(private userService: UserService, private store: Store<any>, private router: Router) {

    this.userTypes = Object.values(EUserType).filter((item) => {
      return isNaN(Number(item));
    }).map((enumStr, index) => {
      var repr =
        { enumStr: enumStr,
          enumVal: index 
        }
      return repr;
    });
  }


  ngOnInit() {

  }


  async register() {
    try {
      await this.userService!.register(this.newUser);

      this.resetNewUserModel();
      if (!this.adminEdit) {
        this.router!.navigate(['/']);
      }
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }

  resetNewUserModel() {
    this.newUser = new User();
  }
}
