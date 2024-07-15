import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonMenuButton, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp } from 'ionicons/icons';
import { AuthService } from './services/auth.service';
import { User } from './model/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonMenuButton, IonButtons, IonHeader, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Chat', url: '/folder/chat', icon: 'paper-plane' },
    { title: 'Groups', url: '/folder/groups', icon: 'paper-plane' },
    { title: 'Members', url: '/folder/members', icon: 'paper-plane' },
    { title: 'Logout', url: '/folder/logout', icon: 'paper-plane' }
  ];

  user: User = new User();

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp });
  }

  showMenu: boolean = true;

  ngOnInit() {

    let token: string = this.cookieService.get('token');
    let userName: string = this.cookieService.get('username');


    if (token) {
      this.authService.setLogin(true)
      this.user.name = userName;
      this.user.token = token;
    }

    if (!this.authService.isLoggedIn()) {
      this.showMenu = false;
      this.router.navigate((['login']));
    } else {
      this.showMenu = true;
    }

  }
}