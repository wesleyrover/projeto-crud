import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { environment } from './../../../environments/environment';


@Injectable()
export class AbstractService {

    url: string = environment.urlString;
    public http: Http;
    public extractData;
    handleError;
    constructor(httpParameter) {
        this.http = httpParameter;
    }

    postMethod(value, relativePath: string) {
        console.log(value);
        return this.http.post(this.url + relativePath, JSON.stringify(value), { headers: this.getHeaders() })
            .map(res  => {
                this.retorno('post', res);
            }).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    putMethod(value, relativePath: string) {
        console.log(value);
        return this.http.put(this.url + relativePath, JSON.stringify(value), { headers: this.getHeaders() })
        .map(res  => {
            console.log('-Method', res);
            JSON.parse(JSON.stringify(res || null));
            this.extractData = res;
            console.log('extractData', this.extractData);
        }).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteMethod(value, relativePath: string) {
        console.log(value);
        return this.http.delete(this.url + relativePath + value)
        .map(res  => {
            this.retorno('delete', res);
        }).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getHeaders(): any {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return headers;
    }

    getMethod(relativePath: string) {
        return this.http.get(this.url + relativePath)
            .map(res => res.json());
    }

    getMethodComException(relativePath: string) {
        return this.http.get(this.url + relativePath, { headers: this.getHeaders() })
            .map(res => res.json()).toPromise().catch(this.handleError);
    }

    private retorno(valor, res) {
        console.log(valor + '-Method', res);
        JSON.parse(JSON.stringify(res || null));
        this.extractData = res;
        console.log('extractData', this.extractData);
    }
}
