import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Requirement } from 'src/@types/apiTypes';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  selected: boolean = false
  data: Requirement
  pageTitle: BehaviorSubject<string> = new BehaviorSubject(null)
  buttonTitle: BehaviorSubject<string> = new BehaviorSubject(null)
  buttonLink: BehaviorSubject<string> = new BehaviorSubject(null)

  constructor() {
  }

  setPageTitle(title: string){
    return this.pageTitle.next(title)
  }
  setButtonTitle(title: string){
    return this.buttonTitle.next(title)
  }
  setButtonLink(link: string){
    return this.buttonLink.next(link)
  }

}
