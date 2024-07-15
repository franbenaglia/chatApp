import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {

  messages: string[] = [];

  private readonly URL = 'ws://localhost:3010';
  
  private webSocketSubject = webSocket<any>(this.URL);

  public webSocket$ = this.webSocketSubject.asObservable();

  sendMessage(message: any): void {
    this.webSocketSubject.next(message);
  }

}
