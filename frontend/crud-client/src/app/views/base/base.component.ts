import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  moduleId: module.id,
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  // Variável
  // public loadingCompleted: boolean;
  msgs: Message[] = [];
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;

  constructor(
    public router: Router, public http: Http) {
  }

  ngOnInit() {
    this.loadcss();
  }

  loadcss() {
    const cssLocal = document.createElement('link');
    cssLocal.type = 'text/css';
    cssLocal.href = 'assets/bootstrap-3.3.7/css/bootstrap.min.css';
    document.getElementsByTagName('head')[0].appendChild(cssLocal);

    const javaScript = document.createElement('script');
    javaScript.type = 'text/javascript';
    javaScript.src = 'assets/bootstrap-3.3.7/js/bootstrap.min.js';
    document.getElementsByTagName('head')[1].appendChild(javaScript);
  }

  showSucesso() {
    this.msgs = [{ severity: 'success', summary: 'Sucesso', detail: 'Salvo Com Sucesso.' }];
  }
  showSucessoParam(detail) {
    this.msgs = [{ severity: 'success', summary: 'Sucesso', detail: detail }];
  }

  showMsgAll(severit: string, titulo, msg: Response | any) {
    let valorMsg: string;
    valorMsg = msg.message ? msg.message : msg.toString();
  //  this.toastrService.info(valorMsg);
  }

  showErro(error: Response | any) {
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
  //  this.toastrService.error(errMsg);
  }

  hide() {
    this.msgs = [];
  }

  showAlerta() {
    this.msgs = [{
      severity: 'warn', summary: 'Alerta',
      detail: 'Não há resultado para essa consulta.'
    }];
  }

}
