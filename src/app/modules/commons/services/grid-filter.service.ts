import { Injectable } from '@angular/core';
import { State, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class GridFilterService {

  constructor() { }

  public appendFilter(filter: CompositeFilterDescriptor, filterValue: { column: string, value: string }[]): CompositeFilterDescriptor {
    const currfilter = filter || { filters: [], logic: 'and' };
    let filters = currfilter.filters;

    // отфильтровываем ранее установленные фильтры по пришедшим полям
    const fields = filterValue.map(val => val.column);
    filters = filters.filter((filter: FilterDescriptor) => fields.findIndex(level => filter.field === level) === -1);

    if (!!filterValue) {
      filterValue.filter(x => !!x.value).forEach(x => {
        const newFilter = { field: x.column, operator: 'eq', value: x.value };
        filters.push(newFilter);
      });
    }

    currfilter.filters = filters;
    return currfilter;
  }
}
