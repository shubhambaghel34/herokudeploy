import { London } from './../../interface/london';

import { Weather, Responsedto } from './../../interface/weather';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { Hotelsdetails } from '../../interface/HotelsDetails';
import { ChatserviceProvider, ChatMessage, UserInfo } from '../../providers/chatservice/chatservice';
import { Observable } from 'rxjs/Observable';

import { InAppBrowser } from '@ionic-native/in-app-browser';
//import {HttpClient} from '@angular/common/http'
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  @ViewChild('Msg_input') messageInput: ElementRef;
  msgList: ChatMessage[] = [];
  user: UserInfo;
  toUser: UserInfo;
  editorMsg = '';
  hotelInfo: any;
  jsdata: any[] = [];
  textvalue = 'Type some message';

  msg: any[] = [];
  messagesRes: any = {};
  arr: any = [];
  varb: any[] = [];
  public items: any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private chatService: ChatserviceProvider, private events: Events,private iab: InAppBrowser) {
    this.toUser = {
      id: navParams.get('toUserId'),
      name: navParams.get('toUsername')
    };
    this.chatService.getUserInfo()
      .then((res) => {
        this.user = res;

      });


  }
  ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {

  }

  ionViewWillEnter() {

  }
  sendMsg() {
    if (!this.editorMsg.trim()) return;
    let newMsg: ChatMessage = {
      message: this.editorMsg,
      userName: 'me',
      useravatar: '',
      messageType: ''
    };
    newMsg.messageType = 'string';
    this.pushMsg(newMsg, 'touser');
    this.editorMsg = '';
    this.chatService.sendMsg(newMsg)
      .then(response => {
        this.messagesRes = response;
        console.log(this.messagesRes);


        this.pushMsg(this.messagesRes, 'fromuser');
      })
  }
  // cardView: boolean = false;
  pushMsg(msg: ChatMessage, type: string) {
    msg['type'] = type;
    if (type === 'fromuser') msg.userName = 'bot';
    else if (type === 'touser') msg.userName = 'me';
    if (type === 'fromuser') msg.useravatar = '../../assets/imgs/chatbot.png';
    else if (type == 'touser') msg.useravatar = '../../assets/imgs/chatbot.jpg';

    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(300, 500);
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  selectroomLinkButton(){
    const browser = this.iab.create('https://www.ihg.com/hotels/us/en/reservation');
    browser.show();
    console.log('link access...');
  }
  selectLiveChat(){
    const browser = this.iab.create('https://www.ihg.com/content/us/en/reservations#scmisc=nav_reservations_6c');
    browser.show();
    console.log('link access...');
  }

  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
  public data = {
    startDate: '2019-08-10',
    endDate: '2019-08-11',
    hotelMnemonics: ['ATLBH'],
  }
  ionViewDidLoad() {
    this.logData();
    console.log('chatservice...');



    setTimeout(() => {
      this.messageInput.nativeElement.focus();

    }, 1000
    );

  }
  async logData() {
    try {
      await this.chatService.getData().subscribe(res => {
        this.hotelInfo = res;
        console.log(res);
        this.jsdata = this.hotelInfo;
        console.log(this.jsdata);
      })
    }
    catch (error) {
      console.error(error);
    }

  }
  prevButton() {
    this.slides.slidePrev();
  }
  nextButton() {
    this.slides.slideNext();
  }
  backButtonShow:boolean = false;
  nextButtonShow:boolean = false;
  slideChange() {
    // console.log(this.slides.realIndex);
    // if(this.slides.realIndex === 0) {this.backButtonShow = true;}
    // else if(this.slides.realIndex === this.jsdata.length - 1) {this.nextButtonShow = true;}
    // else {this.nextButtonShow = true; this.backButtonShow = false;}
  }
  
}
