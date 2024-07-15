import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonButton } from '@ionic/angular/standalone';
import { WebSocketService } from '../services/web-socket.service';
import { catchError, retry, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatPage implements OnInit {

  message: string;
  //messages: string[] = [];

  constructor(private wsService: WebSocketService) {

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
          this.wsService.messages.push(text.substring(1, text.length - 1));
        }
        
      });

  }

  getMessages(){
    return this.wsService.messages;
  }

  ngOnInit() {
  }

  send() {
    this.wsService.sendMessage(this.message);
    this.message='';
  }


}
