import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { RxState } from '@rx-angular/state'
import { TodayComponent } from './today.component'

describe('TodayComponent', () => {
  let spectator: Spectator<TodayComponent>
  const createComponent = createComponentFactory({
    component: TodayComponent,
    providers: [mockProvider(RxState)],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
