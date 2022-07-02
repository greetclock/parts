import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { LocalTodosAdapterService } from './local-todos-adapter.service'

describe('LocalTodosAdapterService', () => {
  let spectator: SpectatorService<LocalTodosAdapterService>
  const createService = createServiceFactory({
    service: LocalTodosAdapterService,
  })

  beforeEach(() => (spectator = createService()))

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })

  describe('createTodo()', () => {
    // todo: check that it saves data to local storage
  })
})
