import { Component, EventEmitter, Output } from '@angular/core'

interface Link {
  link: string
  text: string
}

@Component({
  selector: 'parts-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() linkSelected = new EventEmitter<Link>()

  links: Link[] = [
    {
      link: '/todos/today',
      text: '⭐️ Today',
    },
    {
      link: '/todos/logbook',
      text: '✅ Logbook',
    },
  ]

  onLinkSelected(link: Link) {
    this.linkSelected.next(link)
  }
}
