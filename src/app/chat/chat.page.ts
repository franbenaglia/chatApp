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
import { Message } from '../model/message';
import { imagetest } from '../image.const';

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
  //image: string = imagetest;
  selectedFile: ImageSnippet;

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
          this.chatService.addConnectedUsers(jsonobj.user);
        }
      });

  }

  processFile(imageInput: any) {

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

    });

    reader.readAsDataURL(file);
  }


  getMessages() {
    return this.chatService.messages;
  }

  ngOnInit() {
    this.group = this.chatService.getGroup();
  }

  send() {

    let message: Message = new Message();

    message.user = this.auth.getUser().name;
    message.message = this.message;
    message.group = this.group;
    message.image = this.selectedFile.src;

    //let message = { user: this.auth.getUser().name, message: this.message, group: this.group };
    this.wsService.sendMessage(message);

    this.message = '';
  }


}

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}