import { Pipe, PipeTransform } from '@angular/core';
import { Bike } from './models/bike';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(bikes: Bike[], arg: string): Bike[] {
    return arg === '' ? bikes : (bikes.filter(bike => bike.model.toLowerCase().includes(arg.toLowerCase())));
  }
}
