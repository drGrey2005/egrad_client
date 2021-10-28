import { Component, OnInit, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RegionAPIService } from 'src/app/webapi/api/region.service';
import { BehaviorSubject, Observable } from 'rxjs';

export const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RegionDropdownComponent),
  multi: true
};

@Component({
  selector: 'app-region-dropdown',
  templateUrl: './region-dropdown.component.html',
  styleUrls: ['./region-dropdown.component.css'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class RegionDropdownComponent implements ControlValueAccessor, OnInit {
  protected _selectedItems: number[];
  public set selectedItems(val: number[]) {
    this._selectedItems = val;
    this._changeCallback(this._selectedItems);
  }

  public get selectedItems() {
    return this._selectedItems;
  }
  public displayValue: string;

  get input(): HTMLInputElement {
    return this.host.nativeElement;
  }

  public view: Observable<any>;
  private dataService: BehaviorSubject<any>;

  constructor(private host: ElementRef, private apiService: RegionAPIService) { }

  ngOnInit() {
    this.dataService = new BehaviorSubject(null);
    this.view = this.dataService;

    this.apiService.list().subscribe(data => this.dataService.next(data));
  }

  writeValue(obj: any): void {
    if (obj) {
      this.selectedItems = obj;
    }
  }
  registerOnChange(fn: any): void {
    this._changeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.input.disabled = isDisabled;
  }

  private _changeCallback = (data: any) => { };

  private _onTouchedCallback = () => { };


}
