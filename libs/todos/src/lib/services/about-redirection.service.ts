import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

interface LocalStorageData {
  firstVisit: boolean
}

@Injectable({
  providedIn: 'root',
})
export class AboutRedirectionService {
  constructor(private router: Router) {}

  async initialize() {
    const data = this.getData()
    if (data.firstVisit) {
      await this.router.navigateByUrl('/todos/about')
      this.saveData({ firstVisit: false })
    }
  }

  private getData(): LocalStorageData {
    const data = localStorage.getItem('todos/user')
    if (!data) {
      return {
        firstVisit: true,
      }
    }

    return JSON.parse(data)
  }

  private saveData(data: LocalStorageData) {
    localStorage.setItem('todos/user', JSON.stringify(data))
  }
}
