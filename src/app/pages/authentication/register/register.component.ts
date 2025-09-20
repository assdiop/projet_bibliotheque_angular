import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Utilisateur } from '../../../models/utilisateur.model';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  public user = new Utilisateur();
  confirmPassword?:string;
  myForm!: FormGroup;

  err: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router,
    private authService : AuthService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]]
    });
  }

  onRegister() {
    console.log(this.user);
    this.authService.registerUser(this.user).subscribe({
      next:(res)=>{
        this.toastr.success(this.user.username + " Votre compte à été crée avec succès");
        this.router.navigate(['/login']);
      },
      error:(err:any)=>{
        if(err.status=400){
          this.err= err.error.message;
        }
  }})
}

}


