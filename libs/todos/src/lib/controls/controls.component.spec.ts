import { fakeAsync, tick } from '@angular/core/testing'
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { RxState } from '@rx-angular/state'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'
import { ControlsComponent } from './controls.component'

describe('ControlsComponent', () => {
  let spectator: Spectator<ControlsComponent>
  const createComponent = createComponentFactory({
    component: ControlsComponent,
    providers: [mockProvider(RxState), TodosMainUiStateService],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should set addingNew UI state when the add-new button is clicked', fakeAsync(() => {
    spectator = createComponent()
    spectator.click(byTestId('add-new'))
    spectator.detectChanges()
    tick()

    expect(spectator.inject(RxState).set).toHaveBeenCalledWith({
      addingNew: true,
    })
  }))
})
