import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-menu',
  templateUrl: './primary-menu.component.html',
  styleUrls: ['./primary-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryMenuComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private authFacade: AuthFacade, private router: Router ) { }

  ngOnInit() {
    this.authFacade.authenticated$.subscribe((isAuthenticated: boolean)=>this.isAuthenticated = isAuthenticated);
  }

  logout(){
    this.authFacade.logout();
    this.router.navigate(['/signin'])
  }

}
