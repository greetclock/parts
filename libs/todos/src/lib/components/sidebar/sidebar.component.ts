import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { Subject, takeUntil } from 'rxjs'

interface Link {
  id: string
  link: string
  text: string
  endText?: string
}

const TODAY_ID = 'today'

@Component({
  selector: 'parts-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() linkSelected = new EventEmitter<Link | null>()

  links: Link[] = [
    {
      id: TODAY_ID,
      link: '/todos/today',
      text: '⭐️ To-Do List',
      endText: '',
    },
    {
      id: 'logbook',
      link: '/todos/logbook',
      text: '✅ Logbook',
    },
  ]

  private destroy$ = new Subject<void>()

  constructor(protected todosFacade: TodosFacadeService) {}

  ngOnInit(): void {
    this.watchTodosNumber()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onLinkSelected(link: Link | null = null) {
    this.linkSelected.next(link)
  }

  private watchTodosNumber() {
    this.todosFacade.todosNumber$
      .pipe(takeUntil(this.destroy$))
      .subscribe((todosNumber) => {
        const todosLink = this.links.find((link) => link.id === TODAY_ID)
        if (!todosLink) {
          throw new Error(`Link was not found!`)
        }

        todosLink.endText = '' + todosNumber
      })
  }
}
