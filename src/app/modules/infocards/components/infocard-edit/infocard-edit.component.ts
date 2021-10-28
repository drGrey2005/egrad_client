import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogCloseResult, DialogService} from '@progress/kendo-angular-dialog';
import {DatePipe} from '@angular/common';
import getCadespluginAPI from 'async-cadesplugin';

import {InfocardAPIService} from 'src/app//webapi/api/infocard.service';
import {InfocardDTO, InfocardResolved} from 'src/app//webapi/models/infocard.dto';
import {RoadCommons} from 'src/app/modules/dictionaries/models/road-commons';
import {DocPreviewComponent} from 'src/app/modules/dictionaries/components/doc-preview/doc-preview.component';
import {ReportAPIService} from 'src/app/webapi/api/report.api';
import {ActionType} from 'src/app/models/authorization.types';
import {SecurityService} from 'src/app/services/security.service';
import {FederalRoadAPIService} from 'src/app/webapi/api/federal-road.service';
import {FederalRoadDTO} from 'src/app/webapi/models/federal-road.dto';
import {RoadOwnerAPIService} from 'src/app/webapi/api/road-onwer.service';
import {RoadOwnerDTO} from 'src/app/webapi/models/road-owner.dto';
import {SigninComponent} from 'src/app/modules/commons/components/signin/signin.component';
import {CryptoService} from 'src/app/modules/commons/services/crypto.service';
import {CaseLocationComponent} from './case-location.component';
import {NotifyService} from 'src/app/modules/commons/services/notify.service';

@Component({
  selector: 'app-infocard-edit',
  templateUrl: './infocard-edit.component.html',
  styleUrls: ['./infocard-edit.component.css']
})
export class InfocardEditComponent implements OnInit {
  infocardForm: FormGroup = this.formBuilder.group({
    id: [null],
    owner: [null, [Validators.required]],
    RegNumber: [null, [Validators.required]],
    RoadLength: [null, [Validators.required, Validators.min(0)]],
    LengthComment: [null],
    RoadName: [null, [Validators.required]],
    RoadImportance: [null, [Validators.required]],
    RoadClass: [[], [Validators.required]],
    RoadCategory: [[], [Validators.required]],
    RoadUsingType: [null, [Validators.required]],

    RoadNumber: [null, [Validators.required]],
    CommDate: [null],
    EnterDate: [(new Date()), [Validators.required]],
    Locations: [null, [Validators.required]],
    BookCost: [null, [Validators.min(0)]],
    ResidualValue: [null, [Validators.min(0)]],
    ResidualValueDate: [null],

    ArchiveReason: {value: null, disabled: true},
    CaseLocation: {value: null, disabled: true},
  });

  errorMessage: string;
  isFormSubmitted = false;
  isNew = true;
  actionType = ActionType;

  isArchived: boolean;
  isSigned: boolean;

  roadImportance = RoadCommons.RoadImportanceItems;
  roadClasses = RoadCommons.RoadClasses;
  roadCategories = RoadCommons.RoadCategories;
  roadUsageTypes = RoadCommons.RoadUsageTypes;
  federalRoads: FederalRoadDTO[];
  owners: RoadOwnerDTO[];

  // searchString = '';
  code = '';
  timerId = 0;
  roadName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: InfocardAPIService,
    private notifyService: NotifyService,
    private dialogService: DialogService,
    private reportApiService: ReportAPIService,
    public securityService: SecurityService,
    public datepipe: DatePipe,
    public federalRoadService: FederalRoadAPIService,
    public roadOwnerService: RoadOwnerAPIService,
    private cryptoService: CryptoService
  ) {
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = null;
      this.onRetrieveInfocard(data['infocard']);
    });
  }

  ngOnInit(): void {
    // console.log('ngOnInit');
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.infocardForm.controls[controlName];
    return control.touched && control.invalid;
  }

  // Сохранение инфокарты
  submitClick(sign: boolean = false): void {
    this.isFormSubmitted = true;
    if (this.infocardForm.invalid) {
      Object.keys(this.infocardForm.controls).forEach(controlName =>
        this.infocardForm.controls[controlName].markAsTouched()
      );

      return;
    }

    const dto: InfocardDTO = this.apiService.getInstance(this.infocardForm.getRawValue());
    dto.FederalRoad = this.getFederalRoad();

    dto.RoadImportance = RoadCommons.getRoadImportanceCodeByValue(this.infocardForm.value.RoadImportance).toString();
    dto.RoadCategory = this.infocardForm.value.RoadCategory.map(val => parseInt(val, 10));
    this.apiService.save(dto).subscribe(d => {
      this.resetForm();

      d.RoadImportance = RoadCommons.getRoadImportanceValueByCode(parseInt(d.RoadImportance, 10));
      d.RoadCategory = d.RoadCategory.map(val => val.toString());

      this.infocardForm.patchValue(d);
      this.notifyService.show('Инфокарта успешно записана!');

      if (this.isNew) {
        this.router.navigate(['', 'infocards', d.id, 'edit']);
      }
    });
    if (sign) {
      this.cryptoSign();
    }
  }

  // Просмотреть
  public preview() {
    const entity = this.infocardForm.value;
    const dialog = this.dialogService.open({
      title: entity.RoadName,
      content: DocPreviewComponent,
      actions: [{text: 'Отмена'}, {text: 'Ок', primary: true}],
      width: 800
    });

    const control = dialog.content.instance;
    control.content = this.reportApiService.getInfocardPreview(entity.id);
    control.downloadUrl = this.reportApiService.getInfocardDownload(entity.id, 'docx');
  }

  public onRoadImportanceChange(value) {
    if (value) {
      this.code = RoadCommons.getRoadImportanceCodeByValue(value).toString();
    }
    if (!this.infocardForm.pristine) {
      this.infocardForm.patchValue({RoadName: '', RoadNumber: ''});
      this.infocardForm.get('RoadName').reset();
      this.processRoadImportance(value);
    }
  }

  private processRoadImportance(value) {
    if (value === 'F' || value === 'R' || value === 'M') {
      this.federalRoadService
        // .list({road_type: value})
        .list({RoadImportance: this.code, limit: 50000, search: ''})
        // .list({RoadImportance: RoadCommons.getRoadImportanceCodeByValue(value), limit: 50, search: this.searchString})
        .subscribe(data => {
          this.federalRoads = data;
          this.roadName = this.infocardForm.get('RoadName').value;

          const fedRoad = data.find(r => r.RoadName === this.roadName);
          if (!fedRoad) {
            this.infocardForm.get('RoadName').setValue('');
          }
        });
      this.infocardForm.get('RoadNumber').disable();
    } else if (this.canEdit) {
      this.infocardForm.get('RoadNumber').enable();
    }

    const utControl = this.infocardForm.get('RoadUsingType');
    if (value === 'F') {
      // Федеральные дороги могут быть только общего пользования
      utControl.setValue('S');
      utControl.disable();
    } else if (this.canEdit) {
      utControl.enable();
    }
  }

  public onRoadNameChange(value) {
    if (this.isRoadFromList && this.federalRoads && value) {
      const item = this.federalRoads.find(it => it.RoadName === value);
      if (item) {
        this.infocardForm.patchValue({RoadNumber: item.RoadNumber});
      }
    }
  }

  // Выбор дороги происходит из списка?
  public get isRoadFromList() {
    const roadImportance = this.infocardForm.get('RoadImportance').value;
    return roadImportance === 'F' || roadImportance === 'R' || roadImportance === 'M';
  }

  // Обложка дела
  public coverPreview() {
    const entity = this.infocardForm.value;
    const dialog = this.dialogService.open({
      title: `Обложка ${entity.RoadName}`,
      content: DocPreviewComponent,
      actions: [{text: 'Отмена'}, {text: 'Ок', primary: true}],
      width: 800
    });

    const control = dialog.content.instance;
    control.content = this.reportApiService.getInfocardCover(entity.id);
    control.downloadUrl = this.reportApiService.getInfocardCoverDownload(entity.id, 'docx');
  }

  // Подписать
  public async cryptoSign() {
    const dialog = this.dialogService.open({
      content: SigninComponent,
      width: 800
    });
    const control = dialog.content.instance;
    await control.load();
    dialog.result.subscribe(async result => {
      if (!(result instanceof DialogCloseResult) && result.primary) {
        const card = JSON.stringify(this.infocardForm.value);
        const encoded = this.cryptoService.b64EncodeUnicode(card);

        const api = await getCadespluginAPI();
        const cert = control.selected[0];
        const signature = await api.signBase64(cert.Thumbprint, encoded);

        const singInfo = {
          SignCertFromDate: cert.ValidFrom,
          SignCertTillDate: cert.ValidTo,
          SignIssuer: cert.Issuer,
          SignSubject: cert.SubjectInfo,
          SignProvname: cert.SubjectInfo,
          SignData: signature
        };
        this.apiService.cryptoSign(this.infocardForm.value.id, singInfo).subscribe(d => {
          this.infocardForm.patchValue(d);
          this.notifyService.show('Инфокарта успешно подписана!');
        });
      }
    });
  }

  // Перенести в базу инфокарт
  public simpleSign() {
    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите перенести инфокарту в базу?',
      actions: [
        {text: 'Отмена', dialogResult: 'Cancel'},
        {text: 'Ок', primary: true, dialogResult: 'OK'}
      ]
    });

    dialog.result.subscribe(async result => {
      if ((<any>result).dialogResult === 'OK') {
        const id = this.infocardForm.value.id;

        this.apiService.simpleSign(id).subscribe(response => {
          this.notifyService.show(`Инфокарта успешно перенесена в базу`);

          this.router.navigate(['/infocards']);
        });
      }
    });
  }

  // Изменить размещение бумажного дела
  public changeDocumentLocation() {
    const dialog = this.dialogService.open({
      title: 'Изменение размещения',
      content: CaseLocationComponent,
      actions: [
        {text: 'Отмена', dialogResult: 'Cancel'},
        {text: 'Ок', primary: true, dialogResult: 'OK'}
      ]
    });

    dialog.result.subscribe(async result => {
      if ((<any>result).dialogResult === 'OK') {
        const placementInfo = dialog.content.instance as CaseLocationComponent;
        const caseLocation = placementInfo.paperPlacement;

        this.apiService.change_case_location(this.infocardForm.value.id, {CaseLocation: caseLocation})
          .subscribe(dto => {
            this.notifyService.show(`Размещение бумажного дела успешно изменено`);

            this.infocardForm.setValue(dto.prepareFormData(this.infocardForm));
          });
      }
    });
  }

  public downloadClick(event) {
    if (event.format === 'html') {
      this.preview();
    } else {
      window.location.href = this.reportApiService.getInfocardDownload(this.infocardForm.value.id, event.format);
    }
  }

  public downloadCoverClick(event) {
    if (event.format === 'html') {
      this.coverPreview();
    } else {
      window.location.href = this.reportApiService.getInfocardCoverDownload(this.infocardForm.value.id, event.format);
    }
  }

  // Показывать ли вкладки с участками дорог
  public get isRoadPartTabsVisible(): boolean {
    const ri = this.infocardForm.value.RoadImportance;
    return !this.isNew && ri !== 'L' && ri !== 'P' && !!ri;
  }

  public get canEdit(): boolean {
    return !this.isArchived && this.hasWriteRights;
  }

  public get hasWriteRights(): boolean {
    return this.securityService.hasPermission(ActionType.InfocardModify) ||
      this.securityService.hasPermission(ActionType.MyInfocards);
  }

  private prepareFormData(dto: InfocardDTO): any {
    const d = new InfocardDTO(dto);
    d.RoadCategory = d.RoadCategory.filter(c => !!c);

    return d.prepareFormData(this.infocardForm);
  }

  private resetForm() {
    this.infocardForm.reset();
    this.infocardForm.get('Locations').setValue(null);
  }

  private disableControlsIfNoRights(): void {
    this.securityService.isPermissionInit$.forEach((init) => {
      if (init) {
        if (this.canEdit) {
          Object.keys(this.infocardForm.controls).forEach(controlName => {
              if (controlName === 'RegNumber' && !this.securityService.currentUser.is_superuser) {
                this.infocardForm.controls[controlName].disable();
              } else {
                this.infocardForm.controls[controlName].enable();
              }
            }
          );
        } else {
          Object.keys(this.infocardForm.controls).forEach(controlName =>
            this.infocardForm.controls[controlName].disable());
        }
      }
    });
  }

  private loadDictionaries(): void {
    this.roadOwnerService.list().subscribe(d => (this.owners = d));
  }

  private subscribeControlChanges(): void {
    this.infocardForm.get('RoadImportance').valueChanges
      .subscribe(value => this.onRoadImportanceChange(value));
    this.infocardForm.get('RoadName').valueChanges
      .subscribe(value => this.onRoadNameChange(value));
  }

  private onRetrieveInfocard(infocardResolved: InfocardResolved): void {
    if (infocardResolved && infocardResolved.error) {
      this.errorMessage = infocardResolved.error;
      return;
    }

    this.loadDictionaries();
    this.subscribeControlChanges();
    if (infocardResolved) {
      this.onEditInfocard(infocardResolved);
    } else {
      this.onCreateInfocard();
    }
    this.disableControlsIfNoRights();
  }

  private onCreateInfocard(): void {
    const curYear: number = new Date().getFullYear();
    this.apiService
      .query({EnterDate__year: curYear, mode: 'base', limit: 1})
      .subscribe(result => {
        //  console.log('Result',result)
        this.infocardForm.patchValue({RegNumber: curYear + '-' + (result.count + 1)});
      });

    this.roadOwnerService.getMyOwner().subscribe(
      owner => {
        this.infocardForm.get('owner').setValue(owner.id);
      },
      () => {
      }
    );
  }

  private onEditInfocard(infocardResolved: InfocardResolved): void {
    const infocard: InfocardDTO = infocardResolved.infocard;
    this.isNew = false;
    this.isArchived = infocard.Archived;
    this.isSigned = infocard.Signed;
    this.code = infocard.RoadImportance;


    infocard.RoadImportance = RoadCommons.getRoadImportanceValueByCode(parseInt(infocard.RoadImportance, 10));
    infocard.RoadCategory = infocard.RoadCategory.map(val => val.toString());
    this.infocardForm.setValue(this.prepareFormData(infocard));
    this.processRoadImportance(this.infocardForm.value.RoadImportance);
  }

  onFilterChange(value: any) {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {

      this.federalRoadService
        .list({RoadImportance: this.code, limit: 500, search: value})
        .subscribe(data => {
          this.federalRoads = data;

          const roadName = this.infocardForm.get('RoadName').value;
          const fedRoad = data.find(r => r.RoadName === roadName);
          if (!fedRoad) {
            this.infocardForm.get('RoadName').setValue('');
          }
        });

    }, 2000);


  }

  getFederalRoad(): number {
    if (!this.federalRoads) {
      return;
    }
    return this.federalRoads.find(val => val.RoadName === this.roadName).id;
  }


  roadNameChange($event: any) {
    this.roadName = $event.RoadName;
  }
}
