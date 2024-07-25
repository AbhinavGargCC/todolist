import { Component, ContentChild, QueryList, ViewChild } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TASK_STATE } from '../../constants';
import { DataService } from '../../service/data.service';
import { ToDO } from '../../types';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [PieChartComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
  @ContentChild(PieChartComponent) pieChart!: PieChartComponent;

  result: any;
  dataArray: number[] = [];
  baseUrl: string = 'http://localhost:3000/todo';

  dataObj = {
    [TASK_STATE.DONE]: 0,
    [TASK_STATE.PENDING]: 0,
    [TASK_STATE.BACKLOG]: 0,
    [TASK_STATE.PROGRESS]: 0,
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.get(this.baseUrl, { filterBy: '' }).subscribe({
      next: (v) => {
        this.result = v;
        if (this.result.data.length > 0) {
          this.result.data.map((item: ToDO) => {
            this.dataObj[item.status] = this.dataObj[item.status] + 1;
            return '';
          });
          this.dataArray = [
            this.dataObj[TASK_STATE.DONE],
            this.dataObj[TASK_STATE.PENDING],
            this.dataObj[TASK_STATE.PROGRESS],
            this.dataObj[TASK_STATE.BACKLOG],
          ];
        }
      },
      error: (e) => e,
      complete: () => {},
    });
  }
}
