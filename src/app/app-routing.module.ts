import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishedComponent } from './components/finished/finished.component';
import { PlayingComponent } from './components/playing/playing.component';
import { StoppedComponent } from './components/stopped/stopped.component';
import { AccountComponent } from './components/account/account.component';
import { NewgameComponent } from './components/newgame/newgame.component';

const routes: Routes = [
  {path: 'finalizado', component: FinishedComponent},
  {path: 'jogando', component: PlayingComponent},
  {path: 'parado', component: StoppedComponent},
  {path: 'account/:idAccount', component: AccountComponent},
  {path: 'newgame', component: NewgameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
