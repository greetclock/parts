import 'jest-preset-angular/setup-jest'
import * as crypto from 'crypto'

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
})
