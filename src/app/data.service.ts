import { Injectable } from '@angular/core';
import { Requirement } from 'src/@types/apiTypes';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  selected: boolean = false
  data: Requirement

  constructor() {}

}
