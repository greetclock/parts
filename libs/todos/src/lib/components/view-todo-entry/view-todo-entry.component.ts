import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { Todo } from '@parts/todos/data'
import { Subject, takeUntil } from 'rxjs'
import { contains } from '../../utils/utils'

export type ViewTodo = Omit<Todo, 'uuid'>

@Component({
  selector: 'parts-view-todo-entry',
  templateUrl: './view-todo-entry.component.html',
  styleUrls: ['./view-todo-entry.component.css'],
})
export class ViewTodoEntryComponent implements OnInit, OnDestroy {
  @Input() todo!: ViewTodo
  @Input() isExpanded!: boolean
  @Input() enableCheckbox = true
  @Input() enableAutofocus = true

  @Output() checked = new EventEmitter<boolean>()
  @Output() expand = new EventEmitter<void>()
  @Output() save = new EventEmitter<ViewTodo>()

  private destroy$ = new Subject<void>()
  private outsideClicks$ = new Subject<void>()

  constructor(private elementRef: ElementRef) {}

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

    if (
      !contains(this.elementRef.nativeElement, event.target as HTMLElement) &&
      this.isExpanded
    ) {
      this.outsideClicks$.next()
    }
  }

  onExpand(event: Event) {
    // stopPropagation to ensure that the event isn't communicated to clickOutside() eventually
    // Otherwise the entry is expanded,
    // then clickOutside() is called and the entry instantly collapses back.
    event.stopPropagation()

    this.expand.next()
  }

  onChecked(isChecked: boolean) {
    this.checked.next(isChecked)
  }

  onSave() {
    this.save.next(this.todo)
  }

  private watchOutsideClicks() {
    this.outsideClicks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onSave())
  }

  private validateInputs() {
    if (!this.todo) {
      throw new Error('TodoEntryComponent: [todo] input must be specified.')
    }

    if (this.isExpanded === null || this.isExpanded === undefined) {
      throw new Error(
        'TodoEntryComponent: [isExpanded] input must be specified.'
      )
    }
  }
}
