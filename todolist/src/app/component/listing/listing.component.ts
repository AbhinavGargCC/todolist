import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDO } from '../../types';
import { DataService } from '../../service/data.service';
import { TASK_STATE } from '../../constants';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',
})
export class ListingComponent {
  constructor(private dataService: DataService) {}

  baseUrl: string = 'http://localhost:3000/todo';

  @Input() todoList: ToDO[] = [];
  @Input() showMoveToProgressBtn: boolean = false;
  @Input() showMoveToDoneBtn: boolean = false;
  @Input() showMoveToPendingBtn: boolean = false;
  @Input() showMoveToBacklogBtn: boolean = false;

  @Output() updateForDoneClicked = new EventEmitter<string>();
  @Output() updateForPendingClicked = new EventEmitter<string>();
  @Output() updateForBacklogClicked = new EventEmitter<string>();
  @Output() updateForProgressClicked = new EventEmitter<string>();

  onMoveToProgressClicked(taskId: number, prevStatus: string) {
    this.dataService
      .put(this.baseUrl, taskId, { newStatus: TASK_STATE.PROGRESS })
      .subscribe({
        next: (v) => v,
        error: (e) => e,
        complete: () => this.updateForProgressClicked.emit(prevStatus),
      });
  }

  onMoveToBacklogClicked(taskId: number, prevStatus: string) {
    this.dataService
      .put(this.baseUrl, taskId, { newStatus: TASK_STATE.BACKLOG })
      .subscribe({
        next: (v) => v,
        error: (e) => e,
        complete: () => this.updateForBacklogClicked.emit(prevStatus),
      });
  }

  onMoveToPendingClicked(taskId: number, prevStatus: string) {
    this.dataService
      .put(this.baseUrl, taskId, { newStatus: TASK_STATE.PENDING })
      .subscribe({
        next: (v) => v,
        error: (e) => e,
        complete: () => this.updateForPendingClicked.emit(prevStatus),
      });
  }

  onMoveToDoneClicked(taskId: number, prevStatus: string) {
    this.dataService
      .put(this.baseUrl, taskId, { newStatus: TASK_STATE.DONE })
      .subscribe({
        next: (v) => v,
        error: (e) => e,
        complete: () => this.updateForDoneClicked.emit(prevStatus),
      });
  }
}
