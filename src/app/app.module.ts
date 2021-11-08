import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationService} from './services/authentication.service';
import {BASE_PATH} from './webapi/variables';
import {environment} from 'src/environments/environment';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './services/auth-guard.service';
import {CommonModule, registerLocaleData} from '@angular/common';
import {WebapiModule} from './webapi/webapi.module';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {FormsModule} from '@angular/forms';
import {MainComponent} from './components/main/main.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {HelpComponent} from './components/help/help.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterOrgComponent} from './components/register-org/register-org.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RegisterPersonComponent} from './components/register-person/register-person.component';
import {InfocardsModule} from './modules/infocards/infocards.module';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {RecaptchaDirective} from './directives/recaptcha.directive';
import {CommonsModule} from './modules/commons/commons.module';
import {DialogsModule} from '@progress/kendo-angular-dialog';
import {GlobalErrorHandler} from './global-error-handler';
import {NotificationService} from '@progress/kendo-angular-notification';
import {InfodocsModule} from './modules/infodocs/infodocs.module';
import {RoadOwnersModule} from './modules/road-owners/road-owners.module';
import {SecurityService} from './services/security.service';
import {IntlModule} from '@progress/kendo-angular-intl';
import '@progress/kendo-angular-intl/locales/ru/all';
import localeRu from '@angular/common/locales/ru';
import {MessageService} from '@progress/kendo-angular-l10n';
import {EgradMessageService} from './services/egrad-message.service';
import {ActionLogModule} from './modules/action-log/action-log.module';
import {FooterComponent} from './components/footer/footer.component';
import {ReportsModule} from './modules/reports/reports.module';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeRu, 'ru');

export function webapiBasePathFactory(): string {
  return environment.apiUrl;
}

export function localeFactory(): string {
  return environment.locale;
}

export function jwtOptionsFactory(authService: AuthenticationService) {
  return {
    tokenGetter: () => {
      return authService.getToken();
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    HelpComponent,
    AboutComponent,
    LoginComponent,
    RegisterOrgComponent,
    PageNotFoundComponent,
    RegisterPersonComponent,
    RegisterUserComponent,
    RecaptchaDirective,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    WebapiModule,
    ActionLogModule,
    AppRoutingModule,
    ButtonsModule,
    FormsModule,
    BrowserModule,
    IntlModule,
    InfocardsModule,
    CommonsModule,
    RoadOwnersModule,
    InfodocsModule,
    ReportsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthenticationService]
      },
      config: {
        // ...
        throwNoTokenError: true
      }
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: localeFactory,
      deps: []
    },
    {
      provide: MessageService,
      useClass: EgradMessageService,
      deps: [LOCALE_ID]
    },
    {
      provide: BASE_PATH,
      useFactory: webapiBasePathFactory,
      deps: []
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
      deps: [NotificationService]
    },
    AuthenticationService,
    AuthGuard,
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
