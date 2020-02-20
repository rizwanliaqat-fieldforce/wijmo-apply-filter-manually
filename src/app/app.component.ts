import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  source: any;

  constructor() {
    this.source = this.getData(100);
  }

  initGrid(grid: wjcGrid.FlexGrid) { }

  byCondition(filter: wjcGridFilter.FlexGridFilter) {
    var amtFilter = filter.getColumnFilter('amount').conditionFilter;
    amtFilter.condition1.value = 5000; // value to check is 5000
    
    // values shown will be smaller than 5000 because we have added our own logic.
    amtFilter.condition1.operator = wjcGridFilter.Operator.GT; // operator is Greater than
    filter.apply(); // apply the filter.
  }

  byValue(filter: wjcGridFilter.FlexGridFilter, colum: string) {
    debugger;
    var cntFilter = filter.getColumnFilter(colum).valueFilter;
    cntFilter.showValues = {US: true, Germany: true}; // only show these values
    filter.apply(); // apply the filter
  }

  byCollectionView(grid) {
    grid.collectionView.filter = function(item, prop) {
      return item.country == 'Italy' || item.country == 'Japan'; // only show if country is Italy or Japan
    }
  }

  clearFilter(filter) {
    filter.clear(); // clear the filter
  }

  initFilter(filter: wjcGridFilter.FlexGridFilter) {
    // call any of the filters here. e.g. byValue, byCondition etc
      this.byValue(filter, 'country');
  }

  getData(count: number) {
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [];
    for (var i = 0; i < count; i++) {
      data.push({
        id: i,
        country: countries[i % countries.length],
        date: new Date(2014, i % 12, i % 28),
        amount: Math.random() * 10000,
        active: i % 4 == 0
      });
    }
    return new wjcCore.CollectionView(data);
  }
}