import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links: any[] = [];
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('emblem-india', sanitizer.bypassSecurityTrustResourceUrl("./assets/images/Emblem_of_India.svg"));
   }

  ngOnInit(): void {
    this.links = [
      {label: 'Home'},
      {label: 'Know your Approval', routerLink: 'kya'},
      {label: 'GIS'},
      {label: 'Report'}
    ]
  }

}
