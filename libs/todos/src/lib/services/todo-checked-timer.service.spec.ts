import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { TodoCheckedTimerService } from './todo-checked-timer.service'

describe('TodoCheckedTimerService', () => {
  let spectator: SpectatorService<TodoCheckedTimerService>
  const createService = createServiceFactory(TodoCheckedTimerService)

  beforeEach(() => (spectator = createService()))

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })
})
