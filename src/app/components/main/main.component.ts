import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserAPIService} from 'src/app/webapi/api/user.service';
import {UserDTO} from 'src/app/webapi/models/user';
import {SecurityService} from 'src/app/services/security.service';
import {ActionType} from 'src/app/models/authorization.types';
import {Subscription} from 'rxjs';
import {ActionLogDTO} from 'src/app/webapi/models/action-log.dto';
import {ActionLogAPIService} from 'src/app/webapi/api/action-log.service';
import {ActionLogOperations, ActionLogTypes} from '../../modules/dictionaries/models/action-log-commons';
import {BASE_PATH} from '../../webapi/variables';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  settings: Array<any> = [
    {text: 'Выйти', value: 'exit'}
  ];


  private isAuthenticatedPrevious: boolean;
  private isAuthenticatedSubscription: Subscription;

  public currentUser: UserDTO;
  public actionType: any = ActionType;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userApiService: UserAPIService,
    public securityService: SecurityService,
    private actionLogService: ActionLogAPIService,
    @Inject(BASE_PATH) private basePath: string
  ) {

  }

  ngOnInit() {
    this.isAuthenticatedPrevious = false;

    this.isAuthenticatedSubscription =
      this.authService.isAuthenticated.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.isAuthenticatedPrevious = true;
          this.updateCurrentUser();
        } else {
          this.isAuthenticatedPrevious = false;
          this.currentUser = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
  }

  public get isAuthenticated(): boolean {
    const isAuthenticated = !!this.authService.getToken();
    if (!isAuthenticated && this.isAuthenticatedPrevious) {
      // have lost authentication for some reason...
      this.isAuthenticatedPrevious = isAuthenticated;

      // this.announcementService.setWarning(
      //     'Выполнен выход в другом окне браузера.'
      // );
      this.router.navigate(
        ['login'],
        {
          queryParams: {
            returnUrl: this.router.routerState.snapshot.url
          },
          skipLocationChange: true
        }
      );
    }

    return isAuthenticated;
  }

  onSettingsClick(args: any): void {
    // console.log('Info is: ', args);
    // console.log('BASE_PATH: ', this.basePath);
    if (!args) {
      return;
    }

    switch (args.value) {
      case 'exit':
        this.actionLogService.save(new ActionLogDTO({
          operation: ActionLogOperations.Logout,
          type: ActionLogTypes.Auth,
          data: '',
        })).subscribe();

        // todo: добавить алерт с вопросом Уверен ли
        this.authService.logout();
        this.router.navigate(['/about']);
        break;
      case 'admin':
        window.open(`${this.basePath}/admin/`, '_blank');
        break;
      case 'report_constructor':
        window.open(`${this.basePath}/admin/reports`, '_blank');
        break;
      default:
        break;
    }
  }

  private updateCurrentUser(): void {
    this.userApiService.getCurrent().subscribe(user => {
      this.currentUser = user;
      this.updateSettings(user);
      this.actionLogService.save(new ActionLogDTO({
        operation: ActionLogOperations.Login,
        type: ActionLogTypes.Auth,
        data: '',
      })).subscribe();
    });
  }

  updateSettings(user: UserDTO) {
    if (user.is_superuser) {
      this.settings.push({text: 'Администрирование', value: 'admin'});
      this.settings.push({text: 'Конструктор отчетов', value: 'report_constructor'});
    } else {
      this.settings = this.settings.filter(setting => setting.value === 'exit');
    }
  }
}
