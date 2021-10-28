import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BASE_PATH} from '../../webapi/variables';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  // constructor(private route: ActivatedRoute, private http: HttpClient, @Inject(BASE_PATH) private  basePath) {
  //   console.log('Route: ', route.snapshot.url);
  //   console.log('Route: ', route.snapshot);
  //   this.downloadFile();
  // }
  //
  // downloadFile() {
  //   this.http.get<HttpResponse<Blob>>(`${this.basePath}/files/1.txt`).subscribe(result => {
  //     console.log('Result: ', result);
  //   });
  // }

  ngOnInit() {
  }

}
