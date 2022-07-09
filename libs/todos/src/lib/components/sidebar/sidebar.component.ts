import { Component } from '@angular/core'

@Component({
  selector: 'parts-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  links = [
    {
      link: 'today',
      text: 'Today',
    },
    {
      link: 'logbook',
      text: 'Logbook',
    },
  ]
}
