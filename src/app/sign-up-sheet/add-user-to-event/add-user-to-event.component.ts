import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../core/modalService';
import { FireBaseService } from '../../core/firebaseService';

@Component({
  selector: 'app-add-user-to-event',
  templateUrl: './add-user-to-event.component.html',
  styleUrls: ['./add-user-to-event.component.scss']
})

export class AddUserToEventComponent implements OnInit {
  private eventType: string;
  private date: string;
  private event_id: string;
  private modalReference;
  private displayedColumns: string[] = ['first_name', 'last_name', 'email'];
  private dataSource;
  private selectedRowIndex: Number;
  private selectedRow: any = {};
  @ViewChild('addUserModal', {static: true}) modalTemplate: TemplateRef<any>;


  constructor(private fs: FireBaseService,
              private modalService: NgbModal,
              private myModalService: ModalService) {}

  ngOnInit() { this.myModalService.set(this); }

  open(event_id, eventType: string, date: string, volunteerList: any) {
    this.eventType = eventType;
    this.date = date;
    this.event_id = event_id;
    this.dataSource = new MatTableDataSource(volunteerList);
    this.modalReference = this.modalService.open(this.modalTemplate, { ariaLabelledBy: 'modal-basic-title',
                                                                       size: 'lg',
                                                                       windowClass: 'my-class',
                                                                       centered: true
                                                                     });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setClickedRow(index, row) {
    this.selectedRowIndex = index;
    this.selectedRow = row;
  }

  onSubmit() {
    if (this.selectedRowIndex >= 0) {
      this.modalReference.close();
      this.fs.addUserToEvent(this.event_id,
                             this.selectedRow.first_name,
                             this.selectedRow.last_name,
                             this.selectedRow.id);
      this.selectedRowIndex = -1;
      this.selectedRow = {};
    }
  }
}
