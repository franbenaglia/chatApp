import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle]
})
export class MessageContainerComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input() message: any;
  @Input() color: string;
  @Input() image: string; 

  date: String;
  mess: string;
  username: string;
  imageSource: any

  ngOnInit() {

    let date: Date = new Date();
    this.date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    this.mess = this.message.message;
    this.username = this.message.user;

    //this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.image}`);
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);

  }

}
