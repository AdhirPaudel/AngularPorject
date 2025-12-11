import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { User } from '../user.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users$ = this.userService.getUsers();
  users: User[] = [];
  private chartComponentRef: any;
  isLoading= false;

  @ViewChild('chartHost', { read: ViewContainerRef }) chartHost!: ViewContainerRef;

async loadChartComponent() {
    const { UserRoleChartComponent } = await import('../user-role-chart/user-role-chart.component');

    // Create component only once
    if (!this.chartComponentRef) {
      this.chartComponentRef = this.chartHost.createComponent(UserRoleChartComponent);
    }

    // Set input every time users update
    this.chartComponentRef.setInput('users', this.users);
  }

  constructor(
    private userService: UserServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.users$.subscribe(users => {
    this.users = users ?? [];
    this.loadChartComponent();   // <-- update chart input when users change
  });
    
  }

  async openAddUserDialog() {
    const { UserFormComponent } = await import('../user-form/user-form.component');
    const dialogRef = this.dialog.open(UserFormComponent, { autoFocus: false });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.userService.addUser(result);
        setTimeout(() => {
        this.isLoading = false; 
      }, 500); 
      }
    });
  }

}
