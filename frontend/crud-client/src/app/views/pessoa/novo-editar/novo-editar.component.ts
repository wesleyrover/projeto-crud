import { Message } from 'primeng/primeng';
import { element } from 'protractor';
import { Http } from '@angular/http/';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from '../../../services/index';
import { BaseComponent } from '../../base/base.component';
import { Pessoa } from '../../../models/pessoa';
import 'rxjs/add/operator/toPromise';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-novo-editar-pessoa',
  templateUrl: './novo-editar.component.html',
  styleUrls: ['./novo-editar.component.css'],
  providers: [PessoaService]
})
export class NovoEditarPessoaComponent extends BaseComponent {

  titlePage: string;

  idPessoa: number;

  pessoa: Pessoa;
  pessoaSalvar: Pessoa;

  msgsModal: Message[] = [];

  mySelectValue: Array<any>;
  listaPessoa: Array<Pessoa>;

  @ViewChild('txtnome')
  public inputNome: any;
  @ViewChild('txtidade') inputIdade: any;
  @ViewChild('txtcpf') inputCpf: any;

  modoEdicao: boolean;

  constructor(public router: Router, public http: Http,
    public route: ActivatedRoute,
    private pessoaService: PessoaService) {
    super(router, http);

    route.params.subscribe(params => {
      if (params['pessoa'] != null) {
        this.idPessoa = params['pessoa'];
        this.buscarPessoa();
      }
    });
  }

  ngOnInit() {
    this.titlePage = 'Edição Pessoa';
    if (this.idPessoa == null) {
      this.titlePage = 'Incluir Pessoa';
    }
    this.pessoa = new Pessoa();
    if (this.idPessoa != null) {
      this.modoEditar();
      this.titlePage = 'Editar Pessoa';
    } else {
      this.modoEdicao = false;
    }
    this.loadMask();
  }


  buscarPessoa() {
    this.pessoaService.getAllPessoas().subscribe(data => {
      this.listaPessoa = data;
      this.listaPessoa.filter(p => p.id = this.idPessoa).forEach( e => {
        this.pessoa.cpf = e.cpf;
        this.pessoa.nome = e.nome;
        this.pessoa.idade = e.idade;
      }
      );
    });
  }

  modoEditar() {
    this.modoEdicao = true;
  }

  salvar() {
    this.pessoaSalvar = new Pessoa();
    this.pessoaSalvar.id = this.idPessoa !== null ? this.idPessoa : null;
    this.pessoaSalvar.nome = this.pessoa.nome;
    this.pessoaSalvar.idade = this.pessoa.idade;
    this.pessoaSalvar.cpf = this.pessoa.cpf;
    this.pessoaService.salvar(this.pessoaSalvar).toPromise().then(data => {
      const data1 = data;
      this.showSucessoSalvar();
      if (!this.modoEdicao) {
        this.limparCampos();
      }
    });
  }

  limparCampos() {
    this.pessoa = new Pessoa();
  }

  showSucessoSalvar() {
//  this.toastrService.success('Pessoa Salvo Com Sucesso');
  }

  cancelar() {
    this.irParaConsultaDePessoa();
  }

  irParaConsultaDePessoa() {
    this.router.navigate(['pesquisar-pessoa']);
  }

  loadCPFMask() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.text = ' $(function () { $(".cpf").mask("000.000.000-00", {reverse: false}); });';
    if (document.getElementsByClassName('cpf')[0] != null) {
      document.getElementsByClassName('cpf')[0].appendChild(s);
    }
  }

  loadMask() {
    this.loadCPFMask();
  }

}
