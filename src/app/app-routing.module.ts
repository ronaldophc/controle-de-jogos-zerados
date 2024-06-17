import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishedComponent } from './components/finished/finished.component';
import { AccountComponent } from './components/account/account.component';
import { NewgameComponent } from './components/newgame/newgame.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'finalizado', component: FinishedComponent},
  {path: 'account/:idAccount', component: AccountComponent},
  {path: 'newgame', component: NewgameComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
