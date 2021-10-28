import { Component, OnInit, ViewChild } from '@angular/core';
import { InfocardAPIService } from '../../../../webapi/api/infocard.service';
import { InfocardDTO } from 'src/app/webapi/models/infocard.dto';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { DocPreviewComponent } from 'src/app/modules/dictionaries/components/doc-preview/doc-preview.component';
import { ReportAPIService } from 'src/app/webapi/api/report.api';
import { SecurityService } from 'src/app/services/security.service';
import { ActionType } from 'src/app/models/authorization.types';
import { InfocardGridComponent } from 'src/app/modules/dictionaries/components/infocard-grid/infocard-grid.component';
import {
  InfocardFilterModes,
  InfocardFilterRoadModes,
  InfocardCommons
} from 'src/app/modules/dictionaries/models/infocard-commons';
import { SigninComponent } from 'src/app/modules/commons/components/signin/signin.component';
import getCadespluginAPI from 'async-cadesplugin';
import { CryptoService } from 'src/app/modules/commons/services/crypto.service';
import { ArchiveReasonComponent } from './archive-reason.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from 'src/app/modules/commons/services/notify.service';
import { IEgradDialogResult } from 'src/app/modules/dictionaries/models/EgradDialogResult';

@Component({
  selector: 'app-infocard-list',
  templateUrl: './infocard-list.component.html',
  styleUrls: ['./infocard-list.component.css']
})
export class InfocardListComponent implements OnInit {
  @ViewChild(InfocardGridComponent)
  public infocardGrid: InfocardGridComponent;

  public actionType = ActionType;
  public canFilterRoadMode = false;

  public filterModes = InfocardFilterModes;
  public filterRoadModes = InfocardFilterRoadModes;

  private _filterRoadMode: InfocardFilterRoadModes;

  public get filterRoadMode(): InfocardFilterRoadModes {
    return this._filterRoadMode;
  }
  public set filterRoadMode(value: InfocardFilterRoadModes) {
    this._filterRoadMode = value;
    this.infocardGrid.appendFilter([{ column: 'road_mode', value: value }]);
  }

  constructor(
    private infocardService: InfocardAPIService,
    private notifyService: NotifyService,
    private dialogService: DialogService,
    private reportApiService: ReportAPIService,
    public securityService: SecurityService,
    private cryptoService: CryptoService,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.securityService.isPermissionInit$.subscribe(init => {
      if (init) {
        // Потом этот переменную вообще убрать можно будет
        this.infocardGrid.showStatusColumn = false;

        if (this.securityService.hasPermission(this.actionType.FilterInfocards)) {
          this.canFilterRoadMode = true;
          this.setFilters(
            this.getModeOrDefault(this.activeRoute.snapshot.queryParams.mode),
            this.getRoadModeOrDefault(this.activeRoute.snapshot.queryParams.roadMode));
        } else {
          this.setFilters(
            this.getModeOrDefault(this.activeRoute.snapshot.params.mode),
            InfocardFilterRoadModes.None);
          this.infocardGrid.refresh();
        }

        this.activeRoute.queryParams.subscribe((params) => {
          this.setFilters(
            this.getModeOrDefault(params['mode']),
            this.getRoadModeOrDefault(params['roadMode']));
        });
      }
    });
  }

  public get selectedOne(): boolean {
    return this.infocardGrid.selected && this.infocardGrid.selected.length === 1;
  }

  public onModeBtnClick(mode: InfocardFilterModes) {
    this.router.navigate(['/infocards'], {
      queryParams: { mode: mode, roadMode: this.filterRoadMode }
    });
  }

  public onRoadModeBtnClick(mode: InfocardFilterRoadModes) {
    if (this.filterRoadMode === mode) {
      mode = InfocardFilterRoadModes.None;
    }

    this.router.navigate(['infocards'], {
      queryParams: { mode: this.infocardGrid.filterMode, roadMode: mode }
    });
  }

  public deleteInfocard(entity: InfocardDTO) {
    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите удалить этот черновик инфокарты?',
      actions: [
        { text: 'Отмена' },
        { text: 'Ок', primary: true, confirmed: true }
      ]
    });

    dialog.result.subscribe(async result => {
      if ((<IEgradDialogResult>result).confirmed) {
        const id = entity.id;

        this.infocardService.delete(id).subscribe(response => {
          this.notifyService.show(`Инфокарта успешно удалена`);
          this.infocardGrid.refresh();
        });
      }
    });
  }

  public async moveToArchive(entity: InfocardDTO) {
    const dialog = this.dialogService.open({
      title: 'Перевод в архив',
      content: ArchiveReasonComponent,
      actions: [
        { text: 'Отмена', dialogResult: 'Cancel' },
        { text: 'Ок', primary: true, dialogResult: 'OK' }
      ]
    });

    dialog.result.subscribe(async result => {
      if ((<any>result).dialogResult === 'OK') {
        const moveInfo = dialog.content.instance as ArchiveReasonComponent;
        const archiveReason = moveInfo.reason;
        const caseLocation = moveInfo.paperPlacement;

        const id = entity.id;

        this.infocardService
          .archive(id, { ArchiveReason: archiveReason, CaseLocation: caseLocation })
          .subscribe(response => {
            console.log(response);

            this.notifyService.show(`Инфокарта успешно перенесена в архив`);
            this.infocardGrid.refresh();
          });
      }
    });
  }

  public async innerMoveToArchive() {
    const saveTasks: Promise<InfocardDTO>[] = [];
    this.infocardGrid.selected.forEach(dto => {
      dto.Archived = true;
      saveTasks.push(this.infocardService.save(dto).toPromise());
    });
    const result = await Promise.all(saveTasks);

    this.notifyService.show(`Успешно переведены в архив инфокарт: ${result.length}!`);
    this.infocardGrid.refresh();
  }

  public preview(entity: InfocardDTO) {
    const dialog = this.dialogService.open({
      title: entity.RoadName,
      content: DocPreviewComponent,
      actions: [{ text: 'Отмена' }, { text: 'Ок', primary: true }],
      width: 800
    });

    const control = dialog.content.instance;
    control.content = this.reportApiService.getInfocardPreview(entity.id);
    control.downloadUrl = this.reportApiService.getInfocardDownload(entity.id, 'docx');
  }

  public coverPreview(entity: InfocardDTO) {
    const dialog = this.dialogService.open({
      title: `Обложка ${entity.RoadName}`,
      content: DocPreviewComponent,
      actions: [{ text: 'Отмена' }, { text: 'Ок', primary: true }],
      width: 800
    });

    const control = dialog.content.instance;
    control.content = this.reportApiService.getInfocardCover(entity.id);
    control.downloadUrl = this.reportApiService.getInfocardCoverDownload(entity.id, 'docx');
  }

  public simpleSign(entity: InfocardDTO) {
    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите перенести инфокарту в базу?',
      actions: [
        { text: 'Отмена', dialogResult: 'Cancel' },
        { text: 'Ок', primary: true, dialogResult: 'OK' }
      ]
    });

    dialog.result.subscribe(async result => {
      if ((<any>result).dialogResult === 'OK') {
        const id = entity.id;

        this.infocardService.simpleSign(id).subscribe(response => {
          this.notifyService.show(`Инфокарта успешно перенесена в базу`);
          this.infocardGrid.refresh();
        });
      }
    });
  }

  public onEdit() {
    const clickedItem = this.infocardGrid.selected[0];

    if (clickedItem) {
      this.router.navigate(['infocards', clickedItem.id, 'edit'], {
        queryParams: { mode: this.getModeFilter(), roadMode: this.getRoadModeFilter() }
      });
    }
  }

  // Подписать ЭЦП
  public async cryptoSign(entity: InfocardDTO) {
    const dialog = this.dialogService.open({
      content: SigninComponent,
      width: 800
    });
    const control = dialog.content.instance;
    await control.load();
    dialog.result.subscribe(async result => {
      if (!(result instanceof DialogCloseResult) && result.primary) {
        const card = JSON.stringify(entity);
        const encoded = this.cryptoService.b64EncodeUnicode(card);

        const api = await getCadespluginAPI();
        const cert = control.selected[0];
        const signature = await api.signBase64(control.selected[0].Thumbprint, encoded);

        const singInfo = {
          SignCertFromDate: cert.ValidFrom,
          SignCertTillDate: cert.ValidTo,
          SignIssuer: cert.Issuer,
          SignSubject: cert.SubjectInfo,
          SignProvname: cert.SubjectInfo,
          SignData: signature
        };

        this.infocardService.cryptoSign(entity.id, singInfo).subscribe(response => {
          this.infocardGrid.refresh();
          this.notifyService.show('Инфокарта успешно подписана!');
        });
      }
    });
  }

  public downloadClick(event, selected) {
    if (event.format == 'html') {
      this.preview(selected);
    }
    else {
      window.location.href = this.reportApiService.getInfocardDownload(selected.id, event.format);
    }
  }

  public downloadCoverClick(event, selected) {
    if (event.format == 'html') {
      this.coverPreview(selected);
    }
    else {
      window.location.href = this.reportApiService.getInfocardCoverDownload(selected.id, event.format);
    }
  }

  public getModeFilter(): InfocardFilterModes {
    return this.getModeOrDefault(this.infocardGrid.filterMode);
  }

  public getRoadModeFilter(): InfocardFilterRoadModes {
    return this.getRoadModeOrDefault(this.filterRoadMode);
  }

  public get canEdit(): boolean {
    return this.securityService.hasPermission(ActionType.InfocardModify) ||
      this.securityService.hasPermission(ActionType.MyInfocards);
  }

  public get isArchivePage(): boolean {
    return this.infocardGrid.filterMode === InfocardFilterModes.Archive;
  }

  private getModeOrDefault(mode: InfocardFilterModes): InfocardFilterModes {
    return mode || InfocardFilterModes.Base;
  }

  private getRoadModeOrDefault(mode: InfocardFilterRoadModes): InfocardFilterRoadModes {
    return mode ||
      (this.canFilterRoadMode
        ? InfocardFilterRoadModes.Federal
        : InfocardFilterRoadModes.None);
  }

  private setFilters(mode: InfocardFilterModes, roadMode: InfocardFilterRoadModes) {
    let isChanged = false;

    if (this.infocardGrid.filterMode !== mode) {
      this.infocardGrid.filterMode = mode;
      isChanged = true;
    }

    if (this.filterRoadMode !== roadMode) {
      this.filterRoadMode = roadMode;
      isChanged = true;
    }
    this.infocardGrid.showRoadModeColumn = this.filterRoadMode !== InfocardFilterRoadModes.Federal;

    if (isChanged) {
      this.infocardGrid.moveToFirstPage();
    }
  }
}
