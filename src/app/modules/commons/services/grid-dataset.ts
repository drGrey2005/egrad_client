import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseService } from 'src/app/webapi/api/base.service';
import { BaseDTO } from 'src/app/webapi/models/base.dto';
import { State } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

export class GridDataset extends BehaviorSubject<GridDataResult> {
  public loading: boolean;

  protected service: BaseService<BaseDTO>;

  constructor(apiService: BaseService<BaseDTO>) {
    super(null);
    this.service = apiService;
  }

  public query(state: State, additMapCallback: Function = null): void {
    this.fetch(state, additMapCallback)
      .subscribe(x => super.next(x));
  }

  protected fetch(state: State, additMapCallback: Function): Observable<GridDataResult> {
    this.loading = true;
    const params = this.service.getParamsFromState(state);

    return this.service
      .query(params)
      .pipe(
        map((response: any) => {
          return (<GridDataResult>{
            data: additMapCallback ? response.results.map(additMapCallback) : response.results,
            total: response.count,
          });
        }),
        tap(() => this.loading = false),
      );
  }
}
