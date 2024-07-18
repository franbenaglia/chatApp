import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, SelectChangeEventDetail } from '@ionic/angular/standalone';
import { ChatService } from '../services/chat.service';
import { IonSelectCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: true,
  imports: [IonSelectOption, IonSelect, IonRow, IonGrid, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GroupsPage implements OnInit {

  group: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.group = this.chat.getGroup();
  }

  setEvent($event: any) {
    this.chat.setGroup($event.detail.value);
  }


}
