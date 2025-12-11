import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { User } from '../user.models';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-role-chart',
  standalone: true,
  templateUrl: './user-role-chart.component.html',
  styleUrls: ['./user-role-chart.component.scss']
})
export class UserRoleChartComponent implements AfterViewInit, OnChanges {

  @Input() users: User[] | null = [];
  users$ = this.userService.getUsers();
  @ViewChild('roleChart') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart: any;
  private Chart: any;

  constructor(private zone: NgZone, private readonly userService: UserServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.Chart) {
      // Re-render chart when users input changes and Chart is loaded
      this.zone.runOutsideAngular(() => {
        setTimeout(() => this.renderChart(this.Chart), 0);
      });
    }
  }

  async ngAfterViewInit() {
    // ❗ Run AFTER Angular inserts the dynamic component into DOM
    this.zone.runOutsideAngular(() => {
      setTimeout(async () => {
        const { default: Chart } = await import('chart.js/auto');
        this.Chart = Chart;
        this.renderChart(Chart);
      }, 0); // delay is REQUIRED here
    });
  }

  private renderChart(Chart: any) {
    console.log(this.users)
    if (!this.users || this.users.length === 0) return;

    const ctx = this.chartRef.nativeElement?.getContext('2d');

    if (!ctx) {
      console.warn("Canvas not ready, re-rendering");
      // try again once after DOM settles
      setTimeout(() => this.renderChart(Chart), 50);
      return;
    }

    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
    const counts = {
      Admin: this.users.filter(u => u.role === 'Admin').length,
      Editor: this.users.filter(u => u.role === 'Editor').length,
      Viewer: this.users.filter(u => u.role === 'Viewer').length
    };
    console.log(counts);

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            data: [counts.Admin, counts.Editor, counts.Viewer],
            backgroundColor: ['#42A5F5', '#EC407A', '#FFB74D']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
