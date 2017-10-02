import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive , Injectable} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { PessoaService } from './services/index';
import { RoutingComponents, Routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpModule,
  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
