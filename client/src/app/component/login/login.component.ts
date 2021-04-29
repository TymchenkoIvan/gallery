import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthenticationService, private http: HttpClient, private router: Router) {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.controls['username'].value, this.form.controls['password'].value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigateByUrl('/gallery');
          },
          error => {
            this.error = error.status + ' wrong credentials';
          });
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
