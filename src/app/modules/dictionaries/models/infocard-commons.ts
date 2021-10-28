export enum InfocardFilterModes {
  Base = 'base', // База инфокарт
  Archive = 'archive', // Архив
  Draft = 'draft' // Черновики
}

export enum InfocardFilterRoadModes {
  None = '',
  Federal = 'federal', // Федеральные
  Other = 'other', // Прочие
}

export class InfocardCommons {
  public static get InfocardParts(): Array<{ text: string, value: string }> {
    return [
      { value: 'OWNER', text: 'Сведения о собственнике, владельце автомобильной дороги' },
      { value: 'NAME', text: 'Наименование автомобильной дороги' },
      { value: 'NUM', text: 'Идентификационный номер автомобильной дороги' },
      { value: 'LEN', text: 'Протяженность автомобильной дороги' },
      {
        value: 'CLASS',
        text: 'Сведения о соответствии автомобильной дороги и ее участков техническим характеристикам класса и категории'
      },
      { value: 'USING', text: 'Вид разрешенного использования автомобильной дороги' },
      { value: 'OTHER', text: 'Иные сведения об автомобильной дороге и ее характеристики' }
    ];
  }
}
