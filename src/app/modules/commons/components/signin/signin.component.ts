import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import getCadespluginAPI from 'async-cadesplugin';
import { Certificate } from '../../certificate';
import { RowArgs } from '@progress/kendo-angular-grid';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends DialogContentBase {
  public pluginNotFound = false;
  public personalCertificates: Certificate[];
  public gridData: Certificate[];
  public loading: boolean;

  public errorMessage: string;

  public selected: Certificate[] = [];
  public selectionKey(context: RowArgs): string {
    return context.dataItem;
  }

  constructor(public dialog: DialogRef) {
    super(dialog);
  }

  public async load() {
    try {
      this.loading = true;
      const api = await getCadespluginAPI();
      const certs = await api.getCertsList(); // CertificateAdjuster[]
      this.personalCertificates = certs.map(
        x =>
          new Certificate(
            x.issuerInfo,
            x.thumbprint,
            new Date(x.validPeriod.from),
            new Date(x.validPeriod.to),
            x.subjectInfo
          )
      );

      this.loading = false;
    } catch (error) {
      if (error.message === 'Истекло время ожидания загрузки плагина') {
        this.pluginNotFound = true;
      } else {
        this.errorMessage = error.message;
      }
      this.loading = false;
    }
  }

  public onCancelAction(): void {
    this.dialog.close({ text: 'Отмена' });
  }

  public onConfirmAction(): void {
    this.dialog.close({ text: 'Подписать', primary: true });
  }
}
