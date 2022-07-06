import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
// import { ChildrenOutletContexts } from "@angular/router";
// import { slideInAnimation } from "../../animations";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  // animations: [slideInAnimation]
})
export class EmployeesComponent implements OnInit {

  // private contexts: ChildrenOutletContexts
  constructor(public atuhService: AuthService) { }

  ngOnInit(): void {

  }
  // getRouteAnimationData() {
  //   return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  // }
}
