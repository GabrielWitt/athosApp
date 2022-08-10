import { Component, Input, OnInit } from '@angular/core';
import { Notice } from 'src/app/core/models/notice';
import { NoticeService } from 'src/app/core/services/modules/notice.service';

@Component({
  selector: 'app-notice-bottom-bar',
  templateUrl: './notice-bottom-bar.component.html',
  styleUrls: ['./notice-bottom-bar.component.scss'],
})
export class NoticeBottomBarComponent implements OnInit {
  @Input() userUID: string;
  @Input() notice: Notice;
  @Input() likes: number;
  @Input() comments: number;
  myNotice: Notice = {
    title: '',
    type: null,
    description: '',
    photo: '',
    writer: null,
    comments: [],
    likes: [],
  }

  sending = true;
  editNoticeForm = false;
  myLike = false;

  constructor(
    private notices: NoticeService,
  ) { }

  ngOnInit() {
    this.notice.likes.forEach(like => { if(like === this.userUID){ this.myLike = true; }})
  }

  async addLike(){
    this.sending = true;
    this.myNotice = this.notice;
    try {
      if(this.myLike){
        let likeList = [];
        this.notice.likes.forEach(like =>{
          if(this.userUID !== like){ likeList.push(like)}
        });
        this.myNotice.likes = likeList;
      } else {
        this.myNotice.likes.push(this.userUID);
      }
      await this.notices.UpdateNotice(this.myNotice);
      this.sending = false;
      this.notice.likes = this.myNotice.likes;
      this.myLike = !this.myLike;
    } catch (error) {
      console.log(error);
      this.sending = false;
    }
  }

}
