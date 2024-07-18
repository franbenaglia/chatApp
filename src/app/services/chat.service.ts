import { Injectable } from '@angular/core';
import { returnUpForwardOutline } from 'ionicons/icons';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: any[] = [];
  connectedUsers: string[] = [];

  private group: string = '';

  getGroup(): string {
    return this.group;
  }

  setGroup(group: string) {
    this.group = group;
  }

  addConnectedUsers(user: string) {
    if (!this.connectedUsers.includes(user)) {
      this.connectedUsers.push(user);
    }
  }

}