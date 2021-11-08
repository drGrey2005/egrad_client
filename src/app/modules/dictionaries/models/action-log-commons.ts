export enum ActionLogOperations {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
  Login = 'login',
  Logout = 'logout',
  ListExport = 'list_export',
  Export = 'export',
  CoverExport = 'cover_export',
  Activate = 'activate',
  Deactivate = 'deactivate',
  SimpleSign = 'simple_sign',
  Archive = 'archive',
  CryptoSign = 'crypto_sign',
}

export enum ActionLogTypes {
  Base = 'base',
  Archive = 'archive',
  Draft = 'draft',
  RoadOwner = 'road_owner',
  Infodoc = 'infodoc',
  Auth = 'auth',
  ReportTemplate = 'report_template',
  Report = 'report',
}

export class ActionLogCommons {
  public static get OperationItems(): Array<{ text: string, value: ActionLogOperations }> {
    return [
      {value: ActionLogOperations.Create, text: 'Создание'},
      {value: ActionLogOperations.Update, text: 'Изменение'},
      {value: ActionLogOperations.Delete, text: 'Удаление'},
      {value: ActionLogOperations.Login, text: 'Вход в систему'},
      {value: ActionLogOperations.Logout, text: 'Выход из системы'},
      {value: ActionLogOperations.ListExport, text: 'Выгрузка списка'},
      {value: ActionLogOperations.Export, text: 'Выгрузка'},
      {value: ActionLogOperations.CoverExport, text: 'Выгрузка обложки'},
      {value: ActionLogOperations.Activate, text: 'Активация'},
      {value: ActionLogOperations.Deactivate, text: 'Деактивация'},
      {value: ActionLogOperations.SimpleSign, text: 'Перенос в базу инфокарт'},
      {value: ActionLogOperations.Archive, text: 'Перенос в архив'},
      {value: ActionLogOperations.CryptoSign, text: 'Подписание ЭЦП'},
    ];
  }

  public static get TypeItems(): Array<{ text: string, value: ActionLogTypes }> {
    return [
      {value: ActionLogTypes.Base, text: 'Инфокарта (База)'},
      {value: ActionLogTypes.Archive, text: 'Инфокарта (Архив)'},
      {value: ActionLogTypes.Draft, text: 'Инфокарта (Черновик)'},
      {value: ActionLogTypes.RoadOwner, text: 'Пользователь'},
      {value: ActionLogTypes.Infodoc, text: 'Выписка'},
      {value: ActionLogTypes.Auth, text: 'Авторизация'},
      {value: ActionLogTypes.ReportTemplate, text: 'Шаблон отчета'},
      {value: ActionLogTypes.Report, text: 'Отчет'},
    ];
  }
}
