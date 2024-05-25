import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get name() {
    return this.registerForm.get('name')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.saveLocalStorage(this.registerForm.value);
    }
  }

  saveLocalStorage(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getFromLocalStorage() {
    const savedData = localStorage.getItem('user');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }
}
