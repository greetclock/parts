import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { UuidGeneratorService } from './uuid-generator.service'

describe('UuidGeneratorService', () => {
  let spectator: SpectatorService<UuidGeneratorService>
  const createService = createServiceFactory(UuidGeneratorService)

  beforeEach(() => (spectator = createService()))

  it('should...', () => {
    expect(spectator.service).toBeTruthy()
  })
})
