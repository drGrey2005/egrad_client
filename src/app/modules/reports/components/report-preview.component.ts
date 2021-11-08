import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportTemplateAPIService} from 'src/app/webapi/api/report-template.service';

@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.css']
})
export class ReportPreviewComponent implements OnInit {
  saveAsOptions: Array<{ text: string, value: string, icon: string, fileType: string }> = [
    {
      text: 'Microsoft Excel', value: 'xlsx', icon: 'fa-file-excel',
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    {
      text: 'Microsoft Word', value: 'docx', icon: 'fa-file-word',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    {text: 'PDF', value: 'pdf', icon: 'fa-file-pdf', fileType: 'application/pdf'},
    {text: 'RTF', value: 'rtf', icon: 'fa-file-alt', fileType: 'application/rtf'},
  ];

  @ViewChild('reportHtmlViewer') reportHtmlFrame: ElementRef;

  constructor(private apiService: ReportTemplateAPIService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const frameDocument = this.reportHtmlFrame.nativeElement.contentWindow.document;
    const htmlText = this.route.snapshot.data.previewData;

    frameDocument.open('text/htmlreplace');
    frameDocument.write(htmlText);
    frameDocument.close();
  }

  public onSaveAsClick(item: { text: string, value: string, icon: string, fileType: string }): void {
    if (!item) {
      return;
    }

    const rp = Object.assign({}, this.route.snapshot.queryParams);
    rp.format = item.value;

    this.apiService.export(rp.report_id, rp).subscribe(data => this.downloadFile(data, item.fileType));
  }

  public printReport() {
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();

    const frameDocument = this.reportHtmlFrame.nativeElement.contentWindow.document;
    const markup = frameDocument.documentElement.innerHTML;
    const printPage = `<html>
    <head>
      <title>Печать отчета</title>
    </head>
<body onload="window.print();window.close()">${markup}</body>
  </html>`;
    popupWin.document.write(printPage);
    popupWin.document.close();
  }

  private downloadFile(data, fileType: string) {
    const file = new File([data], 'test.txt', {type: fileType});
    console.log(file);
    const url = window.URL.createObjectURL(file);
    window.open(url);
  }
}
