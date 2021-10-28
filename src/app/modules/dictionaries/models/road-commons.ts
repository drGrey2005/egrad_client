export class RoadCommons {
  public static get RoadImportanceItems(): Array<{ text: string, value: string, code?: number }> {
    return [
      {value: 'F', text: 'Федеральная', code: 1},
      {value: 'R', text: 'Региональная', code: 2},
      {value: 'M', text: 'Межмуниципальная', code: 3},
      {value: 'L', text: 'Местная', code: 4},
      {value: 'P', text: 'Частная', code: 5}
    ];
  }

  public static getRoadImportanceValueByCode(code: number) {
    return this.RoadImportanceItems.find(val => val.code === code).value;
  }

  public static getRoadImportanceCodeByValue(value: string) {
    const result = parseInt(value, 10);
    if (result) {
      return result;
    }
    return this.RoadImportanceItems.find(val => val.value === value).code;
  }

  public static get RoadImportance(): object {
    const result = RoadCommons.RoadImportanceItems.reduce((obj, item) => {
      obj[item['value']] = item;
      return obj;
    }, {});

    return result;
  }

  public static get RoadClasses(): Array<{ text: string, value: string }> {
    return [
      {value: 'M', text: 'Автомагистрали'},
      {value: 'H', text: 'Скоростные автомобильные дороги'},
      {value: 'N', text: 'Обычные автомобильные дороги'},
      {value: 'O', text: 'Прочие'},
      {value: 'Х', text: 'Сведения отсутствуют'}
    ];
  }

  public static get RequestorTypes(): Array<{ text: string, value: string }> {
    return [
      {value: 'PH', text: 'Физическое лицо'},
      {value: 'JU', text: 'Юридическое лицо'},
      {value: 'IP', text: 'Индивидуальный предприниматель'}
    ];
  }

  public static get RoadCategories(): Array<{ text: string, value: string }> {
    return [
      {value: '1', text: 'IА'},
      {value: '2', text: 'IБ'},
      {value: '3', text: 'IВ'},
      {value: '4', text: 'II'},
      {value: '5', text: 'III'},
      {value: '6', text: 'IV'},
      {value: '7', text: 'V'},
      {value: '8', text: 'Сведения отсутствуют'}
    ];
  }


  public static get RoadCategoryToClass(): { [key: string]: string } {
    return {
      '1A': 'M',
      '1Б': 'H',
      '1В': 'N',
      '02': 'N',
      '03': 'N',
      '04': 'N',
      '05': 'N'
    };
  }

  public static get RoadUsageTypes(): Array<{ text: string, value: string }> {
    return [
      {value: '', text: 'Сведения отсутствуют'},
      {value: 'S', text: 'Общего пользования'},
      {value: 'P', text: 'Необщего пользования'}
    ];
  }

  public static get RightDocType(): Array<{ text: string, value: string }> {
    return [
      {value: 'O', text: 'Оперативное управление'},
      {value: 'T', text: 'Доверительное управление'},
      {value: 'W', text: 'Собственность'}
    ];
  }

  public static AddEmptyValue(list: Array<{ text: string, value: string }>) {
    const res = list.slice(0);
    res.unshift({text: '(Нет сведений)', value: ''});
    return res;
  }
}
