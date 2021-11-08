import {Component, OnInit, Input} from '@angular/core';
import {InfocardCommons} from '../../models/infocard-commons';
import {CheckedState, CheckableSettings} from '@progress/kendo-angular-treeview';

@Component({
  selector: 'app-infocard-part',
  templateUrl: './infocard-part.component.html',
  styleUrls: ['./infocard-part.component.css']
})
export class InfocardPartComponent implements OnInit {
  public infocardParts = InfocardCommons.InfocardParts;
  public selected: Array<string> = [];

  @Input() public checkedKeys: string[] = [];

  public checkBy({dataItem}) {
    return dataItem.value;
  }

  public isChecked = (dataItem: any, index: string): CheckedState => {
    if (this.containsItem(dataItem)) {
      return 'checked';
    }

    return 'none';
  };

  private containsItem(item: { text: string, value: string }): boolean {
    return !!this.checkedKeys.find(function (x) {
      return item.value === x;
    });
  }

  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: false,
      checkParents: false,
      enabled: true,
      mode: 'multiple'
    };
  }


  constructor() {
  }

  ngOnInit() {
  }
}
