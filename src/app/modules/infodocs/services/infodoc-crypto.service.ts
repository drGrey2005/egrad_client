import { Injectable } from '@angular/core';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import getCadespluginAPI from 'async-cadesplugin';
import { tap } from 'rxjs/operators';

import { InfodocDTO } from 'src/app/webapi/models/infodoc.dto';
import { SigninComponent } from '../../commons/components/signin/signin.component';
import { CryptoService } from '../../commons/services/crypto.service';
import { InfodocAPIService } from 'src/app/webapi/api/infodoc.service';
import { NotifyService } from '../../commons/services/notify.service';
import { Observable, of, Subscriber, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfodocCryptoService {

  constructor(
    private apiService: InfodocAPIService,
    private notifyService: NotifyService,
    private dialogService: DialogService,
    private cryptoService: CryptoService) { }

  public Sign(infodoc: InfodocDTO): Observable<InfodocDTO> {
    const result: BehaviorSubject<InfodocDTO> = new BehaviorSubject(null);

    if (infodoc.Signed) {
      result.next(infodoc);
      return result;
    }

    const dialog = this.dialogService.open({
      content: SigninComponent,
      width: 800
    });
    const control = dialog.content.instance;
    control.load();
    dialog.result.subscribe(async res => {
      if (!(res instanceof DialogCloseResult) && res.primary) {
        const card = JSON.stringify(infodoc);
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
        return this.apiService.cryptoSign(infodoc.id, singInfo).pipe(
          tap((signed) => {
            result.next(signed);
            this.notifyService.show('Выписка успешно подписана!');
          })
        );
      } else {
        result.next(infodoc);
      }
    });

    return result;
  }
}
