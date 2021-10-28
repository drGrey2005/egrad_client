import { Component, Input, OnInit } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'abs-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css'],
})
/// бОльшая часть скопирована с https://www.telerik.com/kendo-angular-ui/components/grid/filtering/reusable-filter/
export class DropdownFilterComponent extends BaseFilterCellComponent {
  @Input() public filter: CompositeFilterDescriptor;
  /// фильтруемое поле
  @Input() public field: string;

  @Input() public data: any[];
  /// описывает элемент data
  @Input() public textField: string;
  @Input() public valueField: string;

  public get defaultItem(): any {
    return {
      [this.textField]: 'Все',
      [this.valueField]: null,
    };
  }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public onChange(value: any): void {
    this.applyFilter(
      // если дефолтный айтем - фильтр убирается
      // иначе - апдейтится
      value === null ?
        this.removeFilter(this.field) :
        this.updateFilter({
          field: this.field,
          operator: 'eq',
          value: value,
        }),
    );
  }
}
