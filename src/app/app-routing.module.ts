import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// default
import {MainComponent} from './components/main/main.component';

// login
import {LoginComponent} from './components/login/login.component';

// entrance
import {HelpComponent} from './components/help/help.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AboutComponent} from './components/about/about.component';

// infocards
import {InfocardListComponent} from './modules/infocards/components/infocard-list/infocard-list.component';

import {RegisterPersonComponent} from './components/register-person/register-person.component';
import {RegisterOrgComponent} from './components/register-org/register-org.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './services/auth-guard.service';
import {InfocardEditComponent} from './modules/infocards/components/infocard-edit/infocard-edit.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {InfodocListComponent} from './modules/infodocs/components/infodoc-list/infodoc-list.component';
import {RoadOwnerEditComponent} from './modules/road-owners/components/road-owner-edit/road-owner-edit.component';
import {InfodocEditComponent} from './modules/infodocs/components/infodoc-edit/infodoc-edit.component';
import {RoadOwnerListComponent} from './modules/road-owners/components/road-owner-list/road-owner-list.component';
import {ActionLogComponent} from './modules/action-log/components/action-log.component';
import {InfocardEditGuardService} from './modules/infocards/services/infocard-edit-guard.service';
import {ReportListComponent} from './modules/reports/components/report-list.component';
import {InfodocResolverService} from './modules/infodocs/services/infodoc-resolver.service';
import {InfocardResolverService} from './modules/infocards/services/infocard-resolver.service';
import {ReportPreviewComponent} from './modules/reports/components/report-preview.component';
import {ReportPreviewResolverService} from './modules/reports/services/report-preview-resolver.service';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'register/person',
        component: RegisterPersonComponent
      },
      {
        path: 'register/org',
        component: RegisterOrgComponent
      },
      {
        path: 'register/user',
        component: RegisterUserComponent
      },
      {
        path: 'infocards',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: InfocardListComponent
          },
          {
            path: 'create',
            component: InfocardEditComponent,
            canDeactivate: [InfocardEditGuardService]
          },
          {
            path: ':id/edit',
            component: InfocardEditComponent,
            canDeactivate: [InfocardEditGuardService],
            resolve: {
              infocard: InfocardResolverService
            }
          }
        ]
      },
      {
        path: 'infodocs',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: InfodocListComponent,
          },
          {
            path: 'create',
            component: InfodocEditComponent,
          },
          {
            path: ':id/edit',
            component: InfodocEditComponent,
            resolve: {
              infodoc: InfodocResolverService
            }
          }
        ]
      },
      {
        path: 'road-owner',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: RoadOwnerListComponent,
          },
          {
            path: ':id/edit',
            component: RoadOwnerEditComponent
          },
          {
            path: 'view',
            component: RoadOwnerEditComponent,
            data: {id: 'my'}
          }
        ]
      },
      {
        path: 'action-log',
        component: ActionLogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ReportListComponent,
          },
          {
            path: 'preview',
            component: ReportPreviewComponent,
            resolve: {
              previewData: ReportPreviewResolverService
            }
          }
        ]
      },
      {
        path: 'data-migration',
        loadChildren: './modules/data-exchange/data-exchange.module#DataExchangeModule',
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/infocards',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'entrance',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
