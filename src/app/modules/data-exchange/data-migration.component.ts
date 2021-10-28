import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-migration',
  templateUrl: './data-migration.component.html',
  styleUrls: []
})
export class DataMigrationComponent implements OnInit {
  files: File[] = [];
  accept = '.xls*';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  uploadFile(file: File) {
  }
}
