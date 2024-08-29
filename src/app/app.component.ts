import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<div class="app-container bg-light"><router-outlet></router-outlet></div>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BlogManagement';
}
