import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu: any[];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private router: Router
  ) {
  //   this.authService.onTokenChange()
  //  .subscribe((token: NbAuthJWTToken) => {
  //    if (token.isValid()) {
  //      this.user = token.getPayload();
  //    }
  //  });

  //TODO GHARAM
  }

  ngOnInit() {
    this.userMenu = this.user ? [{ title: 'Logout'}]:[{ title: 'Login / Signup'}];
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onMenuClick(event) {
    if (event.title === 'Logout') {
      //TODO LOGOUT LOGIC

      this.router.navigate(['dashboard'])
    }
    if (event.title === 'Login / Signup') {
      this.router.navigate(['auth'])
    }
  }
}
