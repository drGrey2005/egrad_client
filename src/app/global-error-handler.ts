import {ErrorHandler} from '@angular/core';
import {Response} from '@angular/http';
import {NotificationService} from '@progress/kendo-angular-notification';
import {HttpErrorResponse} from '@angular/common/http';

export class GlobalErrorHandler extends ErrorHandler {

  constructor(
    private notificationService: NotificationService
  ) {
    super();
  }

  handleError(error: any): void {
    console.error(error);

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else if (error instanceof HttpErrorResponse) {
      const errorResponse = <HttpErrorResponse>error;

      if (errorResponse.error instanceof ErrorEvent) {
        // client-side error
        errMsg = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errMsg = `Error Code: ${errorResponse.status}\nMessage: ${error.message}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    this.notificationService.show({
      cssClass: 'error-container',
      content: errMsg,
      animation: {type: 'slide', duration: 400},
      position: {horizontal: 'center', vertical: 'top'},
      type: {style: 'error', icon: true},
      closable: false
    });
  }
}
