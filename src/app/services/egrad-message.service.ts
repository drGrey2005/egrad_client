import { MessageService } from '@progress/kendo-angular-l10n';
import { Inject, LOCALE_ID } from '@angular/core';

const data = {
  ru: {
    rtl: false,
    messages: {
      'kendo.grid.noRecords': 'Нет записей.',
      'kendo.dateinput.decrement': 'Декремент.',
      'kendo.datepicker.today': 'Сегодня',
      'kendo.datepicker.toggle': 'Переключить календарь',
      'kendo.dropdownlist.noDataText': 'Нет данных.',
      'kendo.grid.groupPanelEmpty': 'Переместите сюда заголовок колонки, чтобы сгрупировать записи из этой колонки',
      'kendo.grid.pagerFirstPage': 'Перейти к первой странице',
      'kendo.grid.pagerPreviousPage': 'Перейти к предыдущей странице',
      'kendo.grid.pagerNextPage': 'Перейти к следующей странице.',
      'kendo.grid.pagerLastPage': 'Перейти к последней странице.',
      'kendo.grid.pagerPage': 'Страница',
      'kendo.grid.pagerOf': 'из',
      'kendo.grid.pagerItems': 'записей',
      'kendo.grid.pagerItemsPerPage': 'записей на страницу',
      'kendo.grid.filter': 'Фильтр',
      'kendo.numerictextbox.increment': 'Увеличить значение',
      'kendo.numerictextbox.decrement': 'Уменьшить значение',
      'kendo.grid.filterIsTrue': 'Да',
      'kendo.grid.filterIsFalse': 'Нет',
      'kendo.grid.filterBooleanAll': '(Все)'
    }
  }
};

export class EgradMessageService extends MessageService {
  constructor(@Inject(LOCALE_ID) private localeId: string) {
    super();
  }

  public set language(value: string) {
    const lang = data[value];
    if (lang) {
      this.localeId = value;
      this.notify(lang.rtl);
    }
  }

  public get language(): string {
    return this.localeId;
  }

  private get messages(): any {
    const lang = data[this.localeId];

    if (lang) {
      return lang.messages;
    }
  }

  public get(key: string): string {
    return this.messages[key];
  }
}
