import { Component, OnDestroy, OnInit } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css'],
})
export class LogbookComponent implements OnInit, OnDestroy {
  constructor(
    protected todosFacade: TodosFacadeService,
    private uiState: TodosMainUiStateService
  ) {}

  ngOnInit(): void {
    this.uiState.logbookOpened(true)
  }

  ngOnDestroy(): void {
    this.uiState.logbookOpened(false)
  }
}
