import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {
  @ViewChild('list', {static: false}) notifs;
  private notifications: any = [];
  private allRead = false;
  private selectedNotifications: string[] = [];
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.list('event')
           .stateChanges(['child_changed'])
           .subscribe(change => {
             const updated_event = {id: change.payload.key, ...change.payload.val()};
             this.notifications.push(this.getNotificationMsg(updated_event));
           });
  }

  getNotificationMsg(event) {
    let msg = '';
    if (this.isBlank(event.first_name) && this.isBlank(event.last_name)) {
      msg = 'A volunteer was removed from ' + event.event_type + ' on ' + event.event_date_txt;
    } else {
      msg = event.first_name + ' ' + event.last_name + ' was added to ' + event.event_type + ' on ' + event.event_date_txt;
    }
    return {'msg': msg, 'read': false};
  }

  isBlank(str): boolean {
    return (!str || /^\s*$/.test(str));
  }

  onNgModelChange(event) {
    for (const i in this.notifications) {
      if (this.selectedNotifications.includes(i.toString())) {
        this.notifications[i]['read'] = true;
      } else {
        this.notifications[i]['read'] = false;
      }
    }
  }

  blockClose($event: any) {
    $event.stopPropagation();
  }

  onClickOutside() {
    this.notifications =  this.notifications.filter(
          n => n.read === false);
    this.notifs.deselectAll();
  }

  isRead(bool) {
    console.log(bool);
    return bool;
  }

  markAllAsRead($event: any) {
      $event.stopPropagation();
      if (this.allRead) {
        this.notifs.deselectAll();
      } else {
        this.notifs.selectAll();
      }
      this.allRead = !this.allRead;
  }

  notificationsNotEmpty() {
    return this.notifications.length !== 0;
  }
}