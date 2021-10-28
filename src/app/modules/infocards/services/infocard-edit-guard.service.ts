import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { InfocardEditComponent } from '../components/infocard-edit/infocard-edit.component';

@Injectable({
  providedIn: 'root'
})
export class InfocardEditGuardService implements CanDeactivate<InfocardEditComponent> {

  canDeactivate(component: InfocardEditComponent): boolean {
    if (component.infocardForm.dirty) {
      const roadName = component.infocardForm.get('RoadName').value || 'Новая дорога';
      return confirm(`Уйти со страницы и потерять все изменения ${roadName}?`);
    }

    return true;
  }
}
