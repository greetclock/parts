import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { map, mergeMap, Observable, Subject, takeUntil } from 'rxjs'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'
import { contains } from '../utils/utils'

@Component({
  selector: 'parts-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit, OnDestroy {
  @Input() todo!: Todo

  isExpanded$: Observable<boolean> = this.uiState.state
    .select('expandedEntry')
    .pipe(map((expandedUuid) => this.todo.uuid === expandedUuid))

  isCollapsed$ = this.isExpanded$.pipe(map((it) => !it))

  private destroy$ = new Subject<void>()
  private outsideClicks$ = new Subject<void>()

  constructor(
    private todosFacade: TodosFacadeService,
    private uiState: TodosMainUiStateService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.validateInputs()
    this.watchOutsideClicks()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()

    this.outsideClicks$.complete()
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!event) {
      return
    }

    const isExpanded =
      this.todo.uuid === this.uiState.state.get('expandedEntry')

    if (
      !contains(this.elementRef.nativeElement, event.target as HTMLElement) &&
      isExpanded
    ) {
      this.outsideClicks$.next()
    }
  }

  expand() {
    setTimeout(() => {
      this.uiState.expandEntry(this.todo.uuid)
    })
  }

  checked(isChecked: boolean) {
    this.todosFacade.updateTodoStatus(
      this.todo.uuid,
      this.getTodoStatus(isChecked)
    )
  }

  save() {
    this.uiState.collapseEntry(this.todo.uuid)
    return this.todosFacade.updateTodo(this.todo)
  }

  private watchOutsideClicks() {
    this.outsideClicks$
      .pipe(
        mergeMap(() => this.save()),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  private validateInputs() {
    if (!this.todo) {
      throw new Error('TodoEntryComponent: [todo] input must be specified.')
    }
  }

  private getTodoStatus(checked: boolean): Todo['status'] {
    return checked ? 'done' : 'pending'
  }
}
