import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { ToDO } from '../../types';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DialogModule],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.css',
})
export class AddNewTaskComponent {
  @Output() updateTodoList = new EventEmitter<ToDO>();
  visible: boolean = false;

  constructor(private dataService: DataService) {}

  url: string = 'http://localhost:3000/todo';
  todoForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  handleSubmit() {
    this.dataService
      .post(this.url, {
        title: this.todoForm.value.title || '',
        description: this.todoForm.value.description || '',
      })
      .subscribe((data) => {
        this.updateTodoList.emit();
      });
    this.showAddTAskPopup();
  }

  showAddTAskPopup() {
    this.visible = !this.visible;
  }
}
