import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }
  onChange(value: any) {
    this.translateService.use(value.target.value);
  }
  logout(){
    console.log('Logged out')
  }
}
