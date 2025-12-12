import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user.models';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  dataSource = new MatTableDataSource<User>();
  columns = ['name', 'email', 'role'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() set users(value: User[] | null) {
    this.dataSource.data = value || [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

