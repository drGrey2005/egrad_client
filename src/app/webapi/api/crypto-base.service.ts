import { BaseModelDTO } from '../models/base-model.dto';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class CryptoBaseService<T extends BaseModelDTO> extends BaseService<T> {
  public cryptoSign(dataId: number, data: {
    SignData: string, SignIssuer: string, SignSubject: string, SignProvname: string,
    SignCertFromDate: Date, SignCertTillDate: Date
  }): Observable<T> {
    return this.http
      .post(`${this.endpointUrl}${dataId}/crypto_sign/`, data, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => this.getInstance(response))
      );
  }
}
