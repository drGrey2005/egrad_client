import {Component, OnInit} from '@angular/core';
import {RoadCommons} from 'src/app/modules/dictionaries/models/road-commons';
import {RoadOwnerDTO} from 'src/app/webapi/models/road-owner.dto';
import {RoadOwnerAPIService} from 'src/app/webapi/api/road-onwer.service';
import {SignerDTO} from 'src/app/webapi/models/signer.dto';
import {InfodocSignerAPIService} from 'src/app/webapi/api/infodoc-signer.service';
import {OktmoAPIService} from 'src/app/webapi/api/oktmo.service';
import {OktmoDTO} from 'src/app/webapi/models/oktmo.dto';
import {UserDTO} from 'src/app/webapi/models/user';
import {ActionLogCommons} from '../../dictionaries/models/action-log-commons';
import {OrganizationDTO} from 'src/app/webapi/models/organization.dto';

@Component({
  selector: 'abs-generate-report',
  templateUrl: './generate-report.component.html',
  styles: []
})
export class GenerateReportComponent implements OnInit {
  private enabledParams: string[];
  owners: RoadOwnerDTO[];
  infodocSigners: SignerDTO[];
  subjects: OktmoDTO[];
  users: UserDTO[];
  organizations: string[];
  filteredOwners: RoadOwnerDTO[];
  filteredSubjects: OktmoDTO[];
  filteredUsers: UserDTO[];
  filteredOrganizations: string[];

  public set enabled_params(value: string[]) {
    this.enabledParams = value;
  }

  public get enabled_params() {
    const result: string[] = Object.assign(['enter_date_from', 'enter_date_to'], this.enabledParams);

    return result;
  }

  params: any = {};
  roadUsageTypes = RoadCommons.RoadUsageTypes;
  roadImportance = RoadCommons.AddEmptyValue(RoadCommons.RoadImportanceItems);
  roadCategories = RoadCommons.AddEmptyValue(RoadCommons.RoadCategories);
  roadClasses = RoadCommons.AddEmptyValue(RoadCommons.RoadClasses);
  requestorTypes = RoadCommons.AddEmptyValue(RoadCommons.RequestorTypes);
  logOperations = ActionLogCommons.OperationItems;
  logTypes = ActionLogCommons.TypeItems;
  rightDocTypes = RoadCommons.RightDocType;

  constructor(private roadOwnerService: RoadOwnerAPIService,
              private signerService: InfodocSignerAPIService,
              private oktmoService: OktmoAPIService) {
  }

  ngOnInit() {
    this.roadOwnerService.list().subscribe(data => {
      this.owners = data.slice(0).sort(sortByRoadOwner);
      this.owners.unshift(RoadOwnerDTO.Empty);
      this.filteredOwners = this.owners;

      const users = [].concat(...data.map(ro => ro.Users));
      users.unshift(UserDTO.Empty);
      users.forEach(u => u.fio = u.last_name + ' ' + u.first_name);
      this.users = users.sort(sortByUser);
      this.filteredUsers = this.users;

      const organizations = [].concat(...data.map(ro => ro.Organization));
      this.organizations = organizations
        .map(org => org.Name)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(sortByOrganization);
      this.organizations.unshift(OrganizationDTO.EmptyName);
      this.filteredOrganizations = this.organizations;
    });

    this.signerService.list().subscribe(data => {
      this.infodocSigners = data;
      this.infodocSigners.unshift(SignerDTO.Empty);
    });

    this.oktmoService.list().subscribe(data => {
      this.subjects = data.sort(sortByOktmo);
      this.subjects.unshift(OktmoDTO.Empty);
      this.filteredSubjects = this.subjects;
    });
  }

  hasParam(paramName: string): boolean {
    return this.enabled_params.indexOf(paramName) >= 0;
  }

  onFilterSubjects(value) {
    this.filteredSubjects = this.subjects.filter(s => s.Name2.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onFilterUsers(value) {
    this.filteredUsers = this.users.filter(s => (s.last_name + ' ' + s.first_name).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onFilterOwners(value) {
    this.filteredOwners = this.owners.filter(s =>
      s.Name &&
      s.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onFilterOrganizations(value) {
    this.filteredOrganizations = this.organizations.filter(s =>
      s &&
      s.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onPaymentFlagChange(eventData) {
    const pf = this.params.payment_flag;
    if (pf === undefined) {
      this.params.payment_flag = true;
      eventData.srcElement.checked = true;
    } else if (pf) {
      this.params.payment_flag = false;
      eventData.srcElement.checked = false;
    } else {
      this.params.payment_flag = undefined;
    }
  }
}

function sortByRoadOwner(o1: RoadOwnerDTO, o2: RoadOwnerDTO): number {
  if (o1.Name < o2.Name) {
    return -1;
  }
  if (o1.Name > o2.Name) {
    return 1;
  }
  return 0;
}

function sortByOktmo(o1: OktmoDTO, o2: OktmoDTO): number {
  if (o1.Name2 < o2.Name2) {
    return -1;
  }
  if (o1.Name2 > o2.Name2) {
    return 1;
  }
  return 0;
}

function sortByUser(o1: UserDTO, o2: UserDTO): number {
  if (o1.last_name + o1.first_name < o2.last_name + o2.first_name) {
    return -1;
  }
  if (o1.last_name + o1.first_name > o2.last_name + o2.first_name) {
    return 1;
  }
  return 0;
}

function sortByOrganization(o1: string, o2: string): number {
  if (o1 < o2) {
    return -1;
  }
  if (o1 > o2) {
    return 1;
  }
  return 0;
}
