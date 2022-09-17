import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FBAuthService } from './auth/fbauth.service';
import { ThemeService } from './shared/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private ts: ThemeService,
    private auth: FBAuthService
  ) {}

  title: string = environment.title;
  selectedTheme: string = 'default';
  isAuthenticated: Observable<boolean> = this.auth.isAuthenticated();

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.ts.getTheme().subscribe((t) => {
      this.selectedTheme = t;
    });
  }

  toggleTheme() {
    this.selectedTheme = this.selectedTheme == 'default' ? 'dark' : 'default';
    console.log(this.selectedTheme);
  }
}
