import { Injectable } from '@angular/core';
import { BaseEditService } from 'src/app/modules/dictionaries/services/base-edit.service';
import { Observable } from 'rxjs';
import { InfocardAPIService } from 'src/app/webapi/api/infocard.service';
import { DocumentDTO } from 'src/app/webapi/models/document';
import { DocumentAPIService } from 'src/app/webapi/api/document.service';

@Injectable()
export class DocumentEditService extends BaseEditService<DocumentDTO> {
  constructor(private documentApiService: DocumentAPIService, private infocardApi: InfocardAPIService) {
    super(documentApiService);
  }

  protected fetch(inputArgs?: any): Observable<DocumentDTO[]> {
    return this.infocardApi.getDocuments(inputArgs);
  }
}
