import { Component } from '@angular/core';
import { ToDO } from '../../types';
import { DataService } from '../../service/data.service';
import { TASK_STATE } from '../../constants';
import { RouterOutlet } from '@angular/router';
import { ListingComponent } from '../listing/listing.component';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ListingComponent,
    AddNewTaskComponent,
    AddNewTaskComponent,
    SideBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  baseUrl = 'http://localhost:3000/todo';
  result: any;
  pendingTasksList: ToDO[] = [];
  backlogTasksList: ToDO[] = [];
  completedTasksList: ToDO[] = [];
  inProgressTasksList: ToDO[] = [];

  constructor(private dataService: DataService) {}

  //  function to update lists
  updatePendingTasks() {
    this.dataService
      .get(this.baseUrl, { filterBy: TASK_STATE.PENDING })
      .subscribe((data) => {
        this.result = data;
        if (this.result?.data) {
          this.pendingTasksList = this.result?.data;
        }
      });
  }

  updateBacklogTasks() {
    this.dataService
      .get(this.baseUrl, { filterBy: TASK_STATE.BACKLOG })
      .subscribe((data) => {
        this.result = data;
        if (this.result?.data) {
          this.backlogTasksList = this.result?.data;
        }
      });
  }

  updateCompletedTasks() {
    this.dataService
      .get(this.baseUrl, { filterBy: TASK_STATE.DONE })
      .subscribe((data) => {
        this.result = data;
        if (this.result?.data) {
          this.completedTasksList = this.result?.data;
        }
      });
  }

  updateInProgressTasks() {
    this.dataService
      .get(this.baseUrl, { filterBy: TASK_STATE.PROGRESS })
      .subscribe((data) => {
        this.result = data;
        if (this.result?.data) {
          this.inProgressTasksList = this.result?.data;
        }
      });
  }

  // funcitons to update lists on basis of movement of tasks

  callUpdate(updateList: string) {
    switch (updateList) {
      case TASK_STATE.DONE:
        this.updateCompletedTasks();
        break;

      case TASK_STATE.BACKLOG:
        this.updateBacklogTasks();
        break;

      case TASK_STATE.PENDING:
        this.updatePendingTasks();
        break;

      case TASK_STATE.PROGRESS:
        this.updateInProgressTasks();
        break;
    }
  }

  updateForDoneClicked(fromList: string) {
    this.updateCompletedTasks();
    this.callUpdate(fromList);
  }

  updateForProgressClicked(fromList: string) {
    this.updateInProgressTasks();
    this.callUpdate(fromList);
  }
  updateForPendingClicked(fromList: string) {
    this.updatePendingTasks();
    this.callUpdate(fromList);
  }
  updateForBacklogClicked(fromList: string) {
    this.updateBacklogTasks();
    this.callUpdate(fromList);
  }

  ngOnInit() {
    this.updatePendingTasks();
    this.updateBacklogTasks();
    this.updateCompletedTasks();
    this.updateInProgressTasks();
  }
}
