import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame = false;


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form:NgForm){
    if (form.invalid) {
      console.log('Formulario inválido!');
      return;
    }

    Swal.fire({
      text: 'Espere por favor...',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    console.log('Formulario enviado!');
    console.log(this.usuario);
    console.log(form);
    //Este método trae la data de firebase
    //mas info en https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    this.auth.nuevoUsuario(this.usuario)
      .subscribe( resp => {
        console.log('respuesta registro:', resp);
        Swal.close();
        if (this.recuerdame) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      }, err => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al autenticar',
          icon: 'error',
          text: err.error.error.message
        });
      })
  }


}
