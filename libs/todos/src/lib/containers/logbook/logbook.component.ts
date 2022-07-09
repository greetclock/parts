import { Component } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'

@Component({
  selector: 'parts-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css'],
})
export class LogbookComponent {
  constructor(protected todosFacade: TodosFacadeService) {}
}
