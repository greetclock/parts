import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { RxState } from '@rx-angular/state'
import { TodosMainUiStateService } from './todos-main-ui-state.service'

describe('TodosMainUiStateService', () => {
  let spectator: SpectatorService<TodosMainUiStateService>
  const createService = createServiceFactory({
    service: TodosMainUiStateService,
    providers: [RxState],
  })

  beforeEach(() => (spectator = createService()))

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })
})
