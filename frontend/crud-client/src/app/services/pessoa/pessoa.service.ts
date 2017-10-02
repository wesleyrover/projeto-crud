import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract/abstract.service';
import { Pessoa } from '../../models/pessoa';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PessoaService extends AbstractService {

    private relativePath = '/api/pessoa';

    constructor(http: Http) {
        super(http);
    }

    getAllPessoas(): any {
        return this.getMethod(this.relativePath + '/obter-todos');
    }

    getConsultarPorId(id: number): any {
        return this.getMethod(this.relativePath + '/findById');
    }

    salvar(pessoa: Pessoa): Observable<Pessoa> {
        console.log(pessoa);
        return this.http.put(this.url + this.relativePath + '/salvar', JSON.stringify(pessoa), { headers: this.getHeaders() })
            .map((resposnse: Response) => {
                const token = resposnse.json() && resposnse.json();
                return token;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Erro de Servidor'));
    }

    delete(valor: number) {
        return this.deleteMethod(valor, this.relativePath + '/delete/');
      }
}
