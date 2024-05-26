import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoppedComponent } from './components/stopped/stopped.component';
import { PlayingComponent } from './components/playing/playing.component';
import { FinishedComponent } from './components/finished/finished.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewgameComponent } from './components/newgame/newgame.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StoppedComponent,
    PlayingComponent,
    FinishedComponent,
    NavbarComponent,
    AccountComponent,
    RegisterComponent,
    NewgameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
