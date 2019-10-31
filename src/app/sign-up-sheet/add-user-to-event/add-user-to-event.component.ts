import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-add-user-to-event',
  templateUrl: './add-user-to-event.component.html',
  styleUrls: ['./add-user-to-event.component.scss']
})
export class AddUserToEvent implements OnInit {
  @Input() volunteerList;
  private modalReference;
  private model: any = {};
  private form: FormGroup;
  private displayedColumns: string[] = ['first_name', 'last_name', 'email'];
  private dataSource;

  constructor(private modalService: NgbModal, private db: AngularFireDatabase, private formBuilder: FormBuilder) {}

  ngOnInit(){
    console.log('inside child');
    console.log(this.volunteerList);
    this.dataSource = new MatTableDataSource(this.volunteerList);
    this.form = this.formBuilder.group({
      user: ['', Validators.required]
    });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'my-class'});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
