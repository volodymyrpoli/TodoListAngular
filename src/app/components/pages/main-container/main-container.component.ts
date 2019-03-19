import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('lastLoadProjectId');
    this.router.navigate(['login']).catch(console.error);
  }
}
