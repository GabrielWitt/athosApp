import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Session Store
import { NgxsModule } from '@ngxs/store';
import { StoreModule } from '@ngrx/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MainState } from './shared/session/main.state';
import { scoreboardReducer } from './shared/session/ticket.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxsStoragePluginModule.forRoot({
      key: [
        'main.user.email',
      ]
    }),
    StoreModule.forRoot({ game: scoreboardReducer }),
    // NgxsModule.forRoot([MainState], { developmentMode: !environment.production }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
