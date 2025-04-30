import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchComponent } from './match/match.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MescartesComponent } from './components/mescartes/mescartes.component';
import { MagasinComponent } from './components/magasin/magasin.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { apiGuard } from './guard/api.guard';
import { MesdecksComponent } from './components/mesdecks/mesdecks.component';
import { PacksComponent } from './components/packs/packs.component';

const routes: Routes = [
  { path: 'match/:id', component: MatchComponent, canActivate: [apiGuard] },
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: WelcomeComponent, canActivate: [apiGuard] },
      { path: 'mescartes', component: MescartesComponent, canActivate: [apiGuard] },
      { path: 'magasin', component: MagasinComponent, canActivate: [apiGuard] },
      { path: 'decks', component: MesdecksComponent, canActivate: [apiGuard] },
      { path: 'packs', component: PacksComponent, canActivate: [apiGuard] }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))]
})
export class AppRoutingModule { }
