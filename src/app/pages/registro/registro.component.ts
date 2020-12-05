import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;


  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form:NgForm){
    if (form.invalid) {
      console.log('Formulario inválido!');
      return;
    }
    console.log('Formulario enviado!');
    console.log(this.usuario);
    console.log(form);
    //Este método trae la data de firebase
    //mas info en https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    this.auth.nuevoUsuario(this.usuario)
      .subscribe( resp => {
        console.log(resp);
      }, err => {
        console.log(err.error.error.message);
      })
  }


}
