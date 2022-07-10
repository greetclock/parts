import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodosDataModule } from '@parts/todos/data'
import { ButtonLinkComponent } from './components/button-link/button-link.component'
import { CheckboxComponent } from './components/checkbox/checkbox.component'
import { ControlButtonComponent } from './components/control-button/control-button.component'
import { ControlsComponent } from './components/controls/controls.component'
import { NewTodoComponent } from './components/new-todo/new-todo.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { TodoEntryComponent } from './components/todo-entry/todo-entry.component'
import { ViewTodoEntryComponent } from './components/view-todo-entry/view-todo-entry.component'
import { AboutComponent } from './containers/about/about.component'
import { LogbookComponent } from './containers/logbook/logbook.component'
import { TodayComponent } from './containers/today/today.component'
import { TodosMainComponent } from './containers/todos-main/todos-main.component'
import { TodosRoutingModule } from './routing/todos-routing.module'
import { AboutRedirectionService } from './services/about-redirection.service'
import { AutofocusDirective } from './utils/autofocus.directive'

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule,
    FormsModule,
    TodosDataModule,
    OverlayModule,
    PortalModule,
  ],
  declarations: [
    TodayComponent,
    TodosMainComponent,
    ControlsComponent,
    NewTodoComponent,
    TodoEntryComponent,
    CheckboxComponent,
    AutofocusDirective,
    ViewTodoEntryComponent,
    ControlButtonComponent,
    LogbookComponent,
    SidebarComponent,
    AboutComponent,
    ButtonLinkComponent,
  ],
})
export class TodosModule {
  constructor(aboutRedirection: AboutRedirectionService) {
    aboutRedirection.initialize()
  }
}
