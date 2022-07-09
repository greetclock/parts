import { Overlay } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { Subject, takeUntil } from 'rxjs'
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  providers: [TodosMainUiStateService, RxState],
})
export class TodosMainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  constructor(
    protected todosFacade: TodosFacadeService,
    protected state: TodosMainUiStateService,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.requestTodos()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  openSidebar() {
    const overlayRef = this.overlay.create({
      panelClass: 'overlay-sidebar',
      width: '100vw',
      height: '100vh',
    })
    const sidebarPortal = new ComponentPortal(SidebarComponent)

    const sidebarInstanceRef = overlayRef.attach(sidebarPortal)

    sidebarInstanceRef.instance.linkSelected
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        overlayRef.detach()
      })
  }

  private requestTodos() {
    this.todosFacade.getTodos().pipe(takeUntil(this.destroy$)).subscribe()
  }
}
