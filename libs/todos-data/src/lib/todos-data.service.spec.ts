import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { TodosDataService } from './todos-data.service'

describe('TodosDataService', () => {
  let spectator: SpectatorService<TodosDataService>
  const createService = createServiceFactory(TodosDataService)

  beforeEach(() => (spectator = createService()))

  it('should...', () => {
    expect(spectator.service).toBeTruthy()
  })
})
