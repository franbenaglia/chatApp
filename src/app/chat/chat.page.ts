import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonButton } from '@ionic/angular/standalone';
import { WebSocketService } from '../services/web-socket.service';
import { catchError, retry, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageContainerComponent } from '../message-container/message-container.component';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [MessageContainerComponent, IonButton, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatPage implements OnInit {

  message: string;
  group: string = 'general';

  constructor(private chatService: ChatService, private wsService: WebSocketService, private auth: AuthService) {

    this.wsService.webSocket$
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error));
        }),
        retry({ delay: 5_000 }),
        takeUntilDestroyed()
      )
      .subscribe((value: any) => {
        if (value.message) {
          const enc = new TextDecoder("utf-8");
          const text = enc.decode(new Uint8Array(value.message.data).buffer);
          const jsonobj: any = JSON.parse(text);
          this.chatService.messages.push(jsonobj);
        }

      });

  }

  getMessages() {
    return this.chatService.messages;
  }

  ngOnInit() {
  }

  send() {
    //TODO replace for Message
    let message = { user: this.auth.getUser().name, message: this.message, group: this.group };
    this.wsService.sendMessage(message);
    this.message = '';
  }


}
