import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from "../../../services/userservice";
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { showError } from '../../../state/base/actions';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: "Auth",
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  imports: [InputTextModule, CommonModule, FloatLabelModule, FormsModule, ButtonModule, RouterLink, RouterLinkActive]
})
export class Auth implements OnInit {

  userName: string | undefined
  password: string | undefined

  constructor(private userService: UserService, private store: Store<any>, private router: Router) {
  }


  ngOnInit() {

  }


  async authorize() {
    try {
      await this.userService!.authorize(this.userName!, this.password!);
      this.router!.navigate(['/']);
    }
    catch (error) {
      this.store.dispatch(showError({ errorString: error?.toString() }));
    }
  }
}
