import {Pipe} from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTime {
  transform(value: number, args: any[]): any {
    if (!isNaN(value)) {
      var hours = Math.floor(value / 3600);
      var minutes = Math.floor((value - (hours * 3600)) / 60);
      var seconds = value - (hours * 3600) - (minutes * 60);

      return ("0" + hours).substr(-2) + ':'
        + ("0" + minutes).substr(-2) + ':'
        + ("0" + seconds).substr(-2);
    }
    return;
  }
}

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe {
  transform(value: Array<any>, field:string, searchTerm:string): any {
    if (!field) return [];
    if (searchTerm == null) return [...value];
    return value.filter((item) => item[field] === searchTerm);
  }
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe {
  transform(value: Array<any>, field:string): any {
    if (value == null || value.length == 1) {
      return value;
    }
    if (field.startsWith("-")) {
      field = field.substring(1);
      if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
        return [...value].sort((a, b) => b[field].localeCompare(a[field]));
      }
      return [...value].sort((a, b) => b[field] - a[field]);
    }
    else {
      if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
        return [...value].sort((a, b) => -b[field].localeCompare(a[field]));
      }
      return [...value].sort((a, b) => a[field] - b[field]);
    }
  }
}
