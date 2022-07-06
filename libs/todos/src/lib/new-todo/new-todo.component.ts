import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { CreateTodoDto } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { map, partition, skip, Subject, takeUntil } from 'rxjs'
import { TodosMainComponentState } from '../todos-main/todos-main.component'

@Component({
  selector: 'parts-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
})
export class NewTodoComponent implements OnInit, OnDestroy {
  title = ''
  description = ''

  @Output() createTodo = new EventEmitter<CreateTodoDto>()

  private destroy$ = new Subject<void>()

  private outsideClicks$ = new Subject<void>()

  constructor(
    private state: RxState<TodosMainComponentState>,
    private elementRef: ElementRef
  ) {}

  save() {
    this.createTodo.next(this.getCreateTodoDto())
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!event) {
      return
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.outsideClicks$.next()
    }
  }

  ngOnInit(): void {
    this.watchOutsideClicks()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()

    this.outsideClicks$.complete()
  }

  private watchOutsideClicks() {
    const [withData$, withoutData$] = this.separateOuterClicks()

    withoutData$.subscribe(() => this.disableAddingNew())

    withData$
      .pipe(map(() => this.getCreateTodoDto()))
      .subscribe(this.createTodo)
  }

  private separateOuterClicks() {
    const clicks$ = this.closingClicks$()
    return partition(clicks$, () => this.userEnteredData())
  }

  private disableAddingNew() {
    this.state.set({
      addingNew: false,
    })
  }

  private closingClicks$() {
    return this.outsideClicks$.pipe(skip(1), takeUntil(this.destroy$))
  }

  private userEnteredData(): boolean {
    return this.title !== '' || this.description !== ''
  }

  private getCreateTodoDto(): CreateTodoDto {
    return {
      title: this.title,
      description: this.description,
      status: 'pending',
    }
  }
}
