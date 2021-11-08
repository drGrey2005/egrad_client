import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {UserAPIService} from '../webapi/api/user.service';
import {UserDTO} from '../webapi/models/user';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ActionType} from '../models/authorization.types';

@Injectable()
export class SecurityService {
  public currentUser: UserDTO;
  permissions: Array<ActionType> = [];

  private isPermissionInitSubject: BehaviorSubject<boolean>;
  isPermissionInit$: Observable<boolean>;

  constructor(private authService: AuthenticationService, private userApiService: UserAPIService) {
    this.isPermissionInitSubject = new BehaviorSubject<boolean>(false);
    this.isPermissionInit$ = this.isPermissionInitSubject.asObservable();

    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.userApiService.getCurrent().subscribe(data => {
          this.currentUser = data;

          if (this.currentUser.is_staff) {
            this.permissions.push(ActionType.InfocardView);
            this.permissions.push(ActionType.InfocardModify);
            this.permissions.push(ActionType.RoadOwners);
            this.permissions.push(ActionType.Organizations);
            this.permissions.push(ActionType.Infodocs);
            this.permissions.push(ActionType.SimpleSign);
            this.permissions.push(ActionType.FilterInfocards);
            this.permissions.push(ActionType.Reports);
            this.permissions.push(ActionType.InfodocSign);
          } else {
            this.permissions.push(ActionType.MyInfocards);
            this.permissions.push(ActionType.MyRoadOwner);
            this.permissions.push(ActionType.InfocardSign);
            this.permissions.push(ActionType.Reports);
            this.permissions.push(ActionType.InfocardDelete);
          }
          if (this.currentUser.is_superuser) {
            this.permissions.push(ActionType.ActionLog);
            this.permissions.push(ActionType.InfocardDelete);
          }
          this.isPermissionInitSubject.next(true);
        });
      } else {
        this.permissions.length = 0;
      }
    });
  }

  public hasPermission(authGroup: ActionType): boolean {
    if (!this.currentUser || !this.currentUser.is_active) {
      return false;
    }

    if (this.permissions && this.permissions.find(item => item === authGroup)) {
      return true;
    }

    return false;
  }
}
