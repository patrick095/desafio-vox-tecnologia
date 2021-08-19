import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string
  buttonTitle: string 
  buttonLink: string 
  constructor( private DataService: DataService) { 
  }

  ngOnInit(): void {
    this.DataService.pageTitle.subscribe(newTitle => {
      this.title = newTitle
    })
    this.DataService.buttonLink.subscribe(link => {
      this.buttonLink = link
    })
    this.DataService.buttonTitle.subscribe(newTitle => {
      this.buttonTitle = newTitle
    })
  }

  resetDataService(){
    this.DataService.data = null
    this.DataService.selected = false
  }

}
