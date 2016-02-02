import {Pipe} from 'angular2/core';

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
  name: 'search'
})
export class SearchPipe {
  transform(value: Array<any>, args: any[]): any {
    const field: string = args[0];
    const searchTerm: any = args[1];
    if (!field) return [];
    if (searchTerm == null) return value;
    return value.filter((item) => item[field] === searchTerm);
  }
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe {
  transform(value: Array<any>, args: any[]): any {
    let field: string = args[0];
    if (field.startsWith("-")) {
      field = field.substring(1);
      return [...value].sort((a, b) => b[field] - a[field]);
    }
    else {
      return [...value].sort((a, b) => a[field] - b[field]);
    }
  }
}
