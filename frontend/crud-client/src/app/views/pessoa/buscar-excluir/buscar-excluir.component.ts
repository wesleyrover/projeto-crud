import { Component, ViewChild } from '@angular/core';
import { PessoaService } from '../../../services/index';
import { BaseComponent } from '../../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Pessoa } from '../../../models/pessoa';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscar-excluir-pessoa',
  templateUrl: './buscar-excluir.component.html',
  styleUrls: ['./buscar-excluir.component.css'],
  providers: [PessoaService]
})
export class BuscarExcluirPessoaComponent extends BaseComponent {

  pessoa: Pessoa;
  pessoaSalvar: Pessoa;

  titlePage: string;

  nomePessoa: string;

  listaPessoa: Array<Pessoa>;
  listaPessoaCompleta: Array<Pessoa>;

  @ViewChild('txtnome')
  public inputNome: any;

  constructor(public router: Router, public http: Http,
    private route: ActivatedRoute,
    private pessoaServive: PessoaService, public toastrService: ToastrService ) {
    super(router, http, toastrService);
  }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.listaPessoa = new Array<Pessoa>();
    this.pessoaServive.getAllPessoas().subscribe(
      Data => {
        this.listaPessoa = Data;
        this.listaPessoaCompleta = Data;
      }, error => {
        this.showErro(error);
      });
  }

  deletarPessoa(idPessoa: number) {

    this.pessoaSalvar = new Pessoa();
    this.pessoaSalvar.id = idPessoa;
    this.pessoaServive.delete(idPessoa).then(Data => {
    this.removeItem(idPessoa);
    this.showSucessoExcluir();
    }, error => {
      console.log(error);
      console.log(error._body);
      this.showErro(error._body);
    });
  }

  removeItem(id: number) {
    this.listaPessoaCompleta = this.listaPessoaCompleta.filter(item => item.id !== id);
    this.listaPessoa = this.listaPessoaCompleta;
  }

  editarPessoa(idPessoa: number) {
    this.router.navigate(['cadastro-usuario/novo-editar/' + idPessoa]);
  }

  novoUsuario() {
    this.router.navigate(['cadastro-pessoa/novo-editar']);
  }

  showSucessoExcluir() {
    this.msgs = [{ severity: 'success', summary: 'Sucesso', detail: 'Usuário Excluído Com Sucesso' }];
  }
  showSucessoSalvar(mensagem) {
    this.msgs = [{ severity: 'success', summary: 'Sucesso', detail: 'Usuário ' + mensagem + ' com sucesso.' }];
  }

  filtrar() {
    this.listaPessoa = this.listaPessoaCompleta;
    if (this.pessoa !== null) {
      if (this.pessoa.nome !== null) {
        this.listaPessoa = this.listaPessoa.filter(s => s.nome === this.pessoa.nome);
      }
      if (this.pessoa.cpf !== null) {
        this.listaPessoa = this.listaPessoa.filter(s => s.cpf === this.pessoa.cpf);
      }
      if (this.pessoa.idade !== null) {
        this.listaPessoa = this.listaPessoa.filter(s => s.idade === this.pessoa.idade);
      }
    }
  }

}
