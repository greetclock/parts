import { Router } from '@angular/router'
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest'
import { AboutRedirectionService } from './about-redirection.service'

describe('AboutRedirectionService', () => {
  let spectator: SpectatorService<AboutRedirectionService>
  const createService = createServiceFactory({
    service: AboutRedirectionService,
    providers: [mockProvider(Router)],
  })

  beforeEach(() => (spectator = createService()))

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })
})
