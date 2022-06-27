import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private translateService: TranslateService, private auth: AuthService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }
  onChange(value: any) {
    this.translateService.use(value.target.value);
  }
  logout(){
    this.auth.logout();
  }
}
