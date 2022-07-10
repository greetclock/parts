import { FormsModule } from '@angular/forms'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { CheckboxComponent } from './checkbox.component'

describe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>
  const createComponent = createComponentFactory({
    component: CheckboxComponent,
    imports: [FormsModule],
  })

  it('should create', () => {
    spectator = createComponent({
      props: {
        isChecked: false,
      },
    })

    expect(spectator.component).toBeTruthy()
  })

  it('should throw error if props are not provided', () => {
    expect(() => createComponent()).toThrow()
  })
})
