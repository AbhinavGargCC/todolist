import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  @Input() dataArray: number[] = [];

  chart: any;

  title: string = 'pie chart';
  ngOnChanges(changes: SimpleChanges) {
    if (this.dataArray.length) {
      this.initializeChart();
    }
  }

  initializeChart() {
    this.chart = new Chart('pieChart', {
      type: 'pie',

      data: {
        labels: ['Completed', 'Pending', 'In Progress', 'Backlog'],
        datasets: [
          {
            label: 'Task count: ',
            data: this.dataArray,
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
