import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle]
})
export class MessageContainerComponent implements OnInit {

  constructor() { }

  @Input() message: any;
  @Input() color: string;

  date: String;
  mess: string;
  username: string;

  ngOnInit() {

    let date: Date = new Date();
    this.date = date.toLocaleDateString();
    this.mess = this.message.message;
    this.username = this.message.user;

  }

}
