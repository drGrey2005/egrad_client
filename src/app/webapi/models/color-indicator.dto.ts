import {BaseModelDTO} from './base-model.dto';

export class ColorIndicatorDTO extends BaseModelDTO {
  public color: string;
  public type: string;
  public days: number;
}
