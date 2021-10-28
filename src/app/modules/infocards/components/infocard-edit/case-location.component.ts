import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-location',
  template: `
  <form novalidate class="mx-3 my-1">
    <div class="form-group row">
      <label for="placement" class="control-label">Размещение бумажного дела</label>
      <input name="placement" [(ngModel)]="paperPlacement" class="form-control" />
    </div>
  </form>`,
  styles: []
})
export class CaseLocationComponent implements OnInit {
  paperPlacement: string;

  constructor() { }

  ngOnInit() {
  }
}
