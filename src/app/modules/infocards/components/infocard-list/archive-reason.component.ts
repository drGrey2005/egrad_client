import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-archive-reason',
  templateUrl: './archive-reason.component.html',
  styleUrls: []
})
export class ArchiveReasonComponent implements OnInit {
  reason: string;
  paperPlacement: string;

  constructor() {
  }

  ngOnInit() {
  }
}
