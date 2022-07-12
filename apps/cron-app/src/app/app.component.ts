import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cron-app';

  public ngOnInit(): void {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.remove();
    }
  }
  
}
