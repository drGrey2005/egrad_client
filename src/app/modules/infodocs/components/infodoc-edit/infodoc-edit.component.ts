import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {DialogCloseResult, DialogService} from '@progress/kendo-angular-dialog';
import {ReportAPIService} from 'src/app/webapi/api/report.api';
import {SecurityService} from 'src/app/services/security.service';
import {InfodocAPIService} from 'src/app/webapi/api/infodoc.service';
import {InfocardGridComponent} from 'src/app/modules/dictionaries/components/infocard-grid/infocard-grid.component';
import {InfocardFilterModes} from 'src/app/modules/dictionaries/models/infocard-commons';
import {InfocardDocDTO} from 'src/app/webapi/models/infocard-doc.dto';
import {InfodocDTO} from 'src/app/webapi/models/infodoc.dto';
import {InfocardPartComponent} from 'src/app/modules/dictionaries/components/infocard-part/infocard-part.component';
import {InfocardDTO} from 'src/app/webapi/models/infocard.dto';
import {DocPreviewComponent} from 'src/app/modules/dictionaries/components/doc-preview/doc-preview.component';
import {InfodocSignerAPIService} from 'src/app/webapi/api/infodoc-signer.service';
import {SignerDTO} from 'src/app/webapi/models/signer.dto';
import {NotifyService} from 'src/app/modules/commons/services/notify.service';
import {RoadCommons} from 'src/app/modules/dictionaries/models/road-commons';
import {IEgradDialogResult} from 'src/app/modules/dictionaries/models/EgradDialogResult';
import {ActionType} from 'src/app/models/authorization.types';
import {InfodocCryptoService} from '../../services/infodoc-crypto.service';

@Component({
  selector: 'app-infodoc-edit',
  templateUrl: './infodoc-edit.component.html',
  styleUrls: ['./infodoc-edit.component.css']
})
export class InfodocEditComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: [''],
    RequestorType: null,
    RequestOrganization: ['', [Validators.required]],
    RequestDate: ['', [Validators.required]],
    Number: [''],
    CreationDate: [''],
    PaymentInfo: [''],
    PaymentFlag: [false],
    Infocards: this.formBuilder.array([]),
    signer: [null],
    Done: [false],
  });

  isNew = true;
  infodocSigners: SignerDTO[];
  actionType = ActionType;

  filterModes: Array<any> = [
    {text: 'База инфокарт', value: InfocardFilterModes.Base},
    {text: 'Архив', value: InfocardFilterModes.Archive},
    {text: 'Черновики', value: InfocardFilterModes.Draft},
  ];

  requestorTypes = RoadCommons.AddEmptyValue(RoadCommons.RequestorTypes);

  public get infocards(): FormArray {
    return <FormArray>this.form.controls.Infocards;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: InfodocAPIService,
    private notifyService: NotifyService,
    private dialogService: DialogService,
    private reportApiService: ReportAPIService,
    public securityService: SecurityService,
    public signerApiService: InfodocSignerAPIService,
    private infodocCryptoService: InfodocCryptoService
  ) {
    this.route.data.subscribe(
      (data: Data) => {
        const infodoc: InfodocDTO = data['infodoc'];
        if (infodoc) {
          this.isNew = false;
          this.form.patchValue(infodoc);
          this.setInfocards(infodoc.Infocards);
        } else {
          this.isNew = true;
        }
      }
    );

    this.signerApiService.list().subscribe(data => {
      this.infodocSigners = data;
    });
  }

  initInfocard(x: InfocardDTO) {
    return this.formBuilder.group({
      id: x.id,
      RegNumber: x.RegNumber,
      EnterDate: x.EnterDate,
      RoadName: x.RoadName,
      RoadNumber: x.RoadNumber,
      Status: this.getSource(x.Status),
      Parts: this.formBuilder.array([])
    });
  }

  getSource(value: string): string {
    switch (value) {
      case 'base':
        return 'База ИК';
      case 'archive':
        return 'Архив';
      case 'draft':
        return 'Черновик';
      default:
        return '';
    }
  }

  setInfocards(items: InfocardDocDTO[]) {
    const control = this.formBuilder.array([]);
    items.forEach(x => {
      control.push(this.formBuilder.group({
          id: x.id,
          RegNumber: x.RegNumber,
          EnterDate: x.EnterDate,
          RoadName: x.RoadName,
          RoadNumber: x.RoadNumber,
          Status: this.getSource(x.Status),
          Parts: this.formBuilder.array(x.Parts)
        }
      ));
    });
    this.form.setControl('Infocards', control);
  }

  ngOnInit() {
  }

  public canSign(): boolean {
    return !this.isNew
      && this.securityService.hasPermission(ActionType.InfodocSign)
      && !this.form.value.Signed;
  }

  public cryptoSign(): void {
    const infodoc: InfodocDTO = this.apiService.getInstance(this.form.getRawValue());
    this.infodocCryptoService.Sign(infodoc).subscribe(
      doc => {
        if (!!doc) {
          this.form.patchValue(doc);
        }
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.invalid;
  }

  // Назад
  cancelClick(): void {
    this.router.navigateByUrl('/infodocs');
  }

  public onAddInfocardClick(item: { text: string, value: InfocardFilterModes }): void {
    const dialog = this.dialogService.open({
      title: item.text,
      content: InfocardGridComponent,
      actions: [
        {text: 'Выбрать', primary: true}
      ],
      width: 800
    });
    dialog.content.instance.isPopup = true;

    const control = dialog.content.instance;
    control.filterMode = item.value;
    control.refresh();

    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        this.addRange(control.selected);
      }
    });
  }

  public addRange(infocards: InfocardDTO[]) {
    infocards.forEach(card => this.infocards.push(this.initInfocard(card)));
  }

  public removeHandler({dataItem}) {
    const removeItem = (shouldRemove) => {
      if (shouldRemove) {
        const idx = this.infocards.value.findIndex(item => item.id === dataItem.id);
        if (~idx) {
          this.infocards.removeAt(idx);
        }
      }
    };

    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите удалить запись?',
      actions: [
        {text: 'Отмена', dialogResult: 'Cancel'},
        {text: 'Ок', primary: true, dialogResult: 'OK'}
      ]
    });

    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        removeItem(result.text === 'Ок');
      }
    });
  }

  public setParts(item: any) {
    const dialog = this.dialogService.open({
      title: 'Выберите блоки инфокарты, которые попадут в выписку',
      content: InfocardPartComponent,
      actions: [
        {text: 'Выбрать', primary: true}
      ]
    });

    const control = dialog.content.instance;
    control.checkedKeys = item.Parts;

    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        const idx = this.infocards.value.findIndex(x => x.id === item.id);

        if (~idx) {
          (<FormGroup>this.infocards.at(idx)).setControl('Parts', this.formBuilder.array(control.checkedKeys));
        }
      }
    });
  }

  public clear(): void {
    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите очистить список?',
      actions: [
        {text: 'Отмена'},
        {text: 'Ок', primary: true, confirmed: true}
      ]
    });

    dialog.result.subscribe((result) => {
      if ((<IEgradDialogResult>result).confirmed) {
        while (this.infocards.length !== 0) {
          this.infocards.removeAt(0);
        }
      }
    });
  }

  public submitClick(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls)
        .forEach(controlName => this.form.controls[controlName].markAsTouched());

      return;
    }

    const dto: InfodocDTO = this.apiService.getInstance(this.form.getRawValue());
    this.apiService.save(dto).subscribe(d => {
      d.Infocards.forEach(val => {
        val.Status = this.getSource(val.Status);
      });
      this.form.patchValue(d);

      this.notifyService.show('Выписка успешно сохранена!');
      if (this.isNew) {
        this.router.navigate(['', 'infodocs', d.id, 'edit']);
      }
    });
  }

  // Просмотреть
  public preview() {
    const entity = this.form.value;
    const dialog = this.dialogService.open({
      title: `Инфокарта ${entity.Number}`,
      content: DocPreviewComponent,
      actions: [
        {text: 'Закрыть', primary: true}
      ],
      width: 800
    });

    const control = dialog.content.instance;
    control.content = this.reportApiService.getInfodocPreview(entity.id);
    control.downloadUrl = this.reportApiService.getInfodocDownload(entity.id, 'docx');
  }

  public downloadClick(event) {
    if (event.format == 'html') {
      this.preview();
    } else {
      window.location.href = this.reportApiService.getInfodocDownload(this.form.value.id, event.format);
    }
  }
}
