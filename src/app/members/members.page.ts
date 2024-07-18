import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MembersPage implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  getUsers(): string[] {
    return this.chatService.connectedUsers;
  }

}
