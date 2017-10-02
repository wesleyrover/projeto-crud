import { Routes, RouterModule } from '@angular/router';
import { BuscarExcluirPessoaComponent, NovoEditarPessoaComponent } from './views/pessoa/index';

const appRoutes: Routes = [
    { path: 'pesquisar-pessoa', component: BuscarExcluirPessoaComponent },
    { path: 'cadastro-pessoa/novo-editar', component: NovoEditarPessoaComponent},
    { path: 'cadastro-usuario/novo-editar/:pessoa', component: NovoEditarPessoaComponent}
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });

export const RoutingComponents = [ BuscarExcluirPessoaComponent, NovoEditarPessoaComponent];
