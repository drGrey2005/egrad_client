import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-doc-preview',
  templateUrl: './doc-preview.component.html',
  styleUrls: ['./doc-preview.component.css']
})
export class DocPreviewComponent implements OnInit {
  @ViewChild('reportHtmlViewer') reportHtmlFrame: ElementRef;

  @Input() content: Observable<any>;
  @Input() downloadUrl: string;

  public loading = false;
  public loaded = false;

  constructor() {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.content
      .subscribe(htmlText => {
          this.loadFrameContent(htmlText);
          this.loading = false;
        },
        error => {
          this.loading = false;
          throw error;
        });
  }

  private loadFrameContent(htmlText: string): void {
    if (!this.reportHtmlFrame.nativeElement.contentWindow) {
      return;
    }

    const frameDocument = this.reportHtmlFrame.nativeElement.contentWindow.document;

    frameDocument.open('text/htmlreplace');
    frameDocument.write(htmlText);
    frameDocument.close();

    this.loaded = true;
  }
}
