import { Component, OnInit, HostListener } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent, GridDataResult, RowArgs } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { InfodocAPIService } from 'src/app/webapi/api/infodoc.service';
import { ReportAPIService } from 'src/app/webapi/api/report.api';
import { SecurityService } from 'src/app/services/security.service';
import { GridDataset } from 'src/app/modules/commons/services/grid-dataset';
import { InfodocDTO } from 'src/app/webapi/models/infodoc.dto';
import { DocPreviewComponent } from 'src/app/modules/dictionaries/components/doc-preview/doc-preview.component';
import { InfodocSignerAPIService } from 'src/app/webapi/api/infodoc-signer.service';
import { SignerDTO } from 'src/app/webapi/models/signer.dto';
import { GridFilterService } from 'src/app/modules/commons/services/grid-filter.service';
import { ActionLogAPIService } from 'src/app/webapi/api/action-log.service';
import { ActionLogDTO } from 'src/app/webapi/models/action-log.dto';
import { ActionLogOperations, ActionLogTypes } from 'src/app/modules/dictionaries/models/action-log-commons';
import { ActionType } from 'src/app/models/authorization.types';
import { InfodocCryptoService } from '../../services/infodoc-crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infodoc-list',
  templateUrl: './infodoc-list.component.html',
  styleUrls: ['./infodoc-list.component.css']
})
export class InfodocListComponent implements OnInit {
  public dataset: GridDataset;
  public selected: InfodocDTO[] = [];
  public get selectedOne() {
    return this.selected && this.selected.length === 1;
  }
  public state: State = {
    skip: 0,
    take: 30
  };
  public gridHeight = 500;
  actionType = ActionType;

  public searchForm: FormGroup = new FormGroup({
    filter: new FormControl('')
  });

  public infodocSigners: SignerDTO[];

  constructor(
    private apiService: InfodocAPIService,
    signerApiService: InfodocSignerAPIService,
    private dialogService: DialogService,
    private reportApiService: ReportAPIService,
    public securityService: SecurityService,
    private gridFilterService: GridFilterService,
    private actionLogService: ActionLogAPIService,
    private infodocCryptoService: InfodocCryptoService,
    private router: Router
  ) {
    this.dataset = new GridDataset(apiService);
    signerApiService.list().subscribe(data => {
      this.infodocSigners = data;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeGrid();
  }

  ngOnInit() {
    this.resizeGrid();
    this.refresh();
  }

  public refresh(): void {
    this.dataset.query(this.state);
    this.selected = [];
  }

  public getSelectionKey(context: RowArgs): any {
    return context.dataItem;
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.refresh();
  }

  public canSign(): boolean {
    return this.selectedOne
      && this.securityService.hasPermission(ActionType.InfodocSign)
      && !this.selected[0].Signed;
  }

  public preview(entity: InfodocDTO) {
    const dialog = this.dialogService.open({
      title: entity.Number,
      content: DocPreviewComponent,
      actions: [
        { text: 'Отмена' },
        { text: 'Ок', primary: true }
      ],
      width: 800
    });

    const control = dialog.content.instance;
    control.content = this.reportApiService.getInfodocPreview(entity.id);
    control.downloadUrl = this.reportApiService.getInfodocDownload(entity.id, 'docx');
  }

  public search(): void {
    if (!this.searchForm.valid) {
      return;
    }

    this.state.filter = this.gridFilterService.appendFilter(this.state.filter, [{ column: 'search', value: this.searchForm.value.filter }]);
    this.refresh();
  }

  /* Экспорт в эксель */
  public allData = (): Observable<any> => {
    const state: State = Object.assign({}, this.state);

    state.take = 10000000;
    state.skip = 0;

    this.actionLogService.save(new ActionLogDTO({
      operation: ActionLogOperations.ListExport,
      type: ActionLogTypes.Infodoc,
      data: '',
    })).subscribe();

    const params = this.apiService.getParamsFromState(state);
    return this.apiService
      .query(params)
      .pipe(
        map((response: any) => {
          return (<GridDataResult>{
            data: response.results,
            total: response.count,
          });
        })
      );
  }

  public dblClickEvent(event): void {
    if (this.selectedOne) {
      this.router.navigate(['infodocs', this.selected[0].id, 'edit']);
    }
  }

  public async cryptoSign() {
    if (this.selected.length !== 1) {
      return;
    }
    this.infodocCryptoService.Sign(this.selected[0]).subscribe(
      infodoc => Object.assign(this.selected[0], infodoc)
    );
  }

  public downloadClick(event, selected) {
    if (event.format === 'html') {
      this.preview(selected);
    } else {
      window.location.href = this.reportApiService.getInfodocDownload(selected.id, event.format);
    }
  }

  private resizeGrid() {
    const navHeight = document.querySelector('nav').clientHeight;
    const footerHeight = document.querySelector('.fixed-bottom').clientHeight;

    this.gridHeight = window.innerHeight - navHeight - footerHeight - 75;
  }
}
