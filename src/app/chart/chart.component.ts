import { AfterViewInit, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { catchError, retry, throwError } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';
import { ChartService } from '../services/chart.service';


@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'chart-root',
  styleUrls: ['./chart.component.css'],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit {

  public interval: number = 1;
  public chart!: Chart;

  constructor(
    private ws: WebSocketService,
    private chartService: ChartService
  ) {
    this.ws.webSocket$
      .pipe(
        catchError((error) => {
          this.interval = 1;
          return throwError(() => new Error(error));
        }),
        retry({ delay: 5_000 }),
        takeUntilDestroyed()
      )
      .subscribe((value: string) => {
        this.chartService.addData(this.chart, this.interval, parseInt(value));
      });
  }

  ngAfterViewInit(): void {
    this.chart = this.chartService.createChart();
  }

  updateInterval(interval: number) {
    this.interval = interval;
    this.ws.updateInterval(interval);
  }
}