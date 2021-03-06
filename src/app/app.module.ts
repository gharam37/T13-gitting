import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    AppRoutingModule,
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
           baseEndpoint: 'http://localhost:3000/api',
           login: {
             endpoint: '/auth/sign-in',
             method: 'post',
             redirect: {
               success: '/',
               failure: null,
             },
           },
           register: {
             endpoint: '/auth/sign-up',
             method: 'post',
           },
           logout: {
              endpoint: '/auth/sign-out',
              redirect: {
                success: '/dashboard',
                failure: null,
              },
            },
            requestPass: {
              endpoint: '/auth/request-pass',
              method: 'get',
            },

          },
        },

      },
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },{ provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken }]
})
export class AppModule {}
