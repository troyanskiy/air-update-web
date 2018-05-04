import { EventEmitter, Injectable } from '@angular/core';
import { AlertOptions, Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class EventService {

  static instance: EventService;

  private emitter: EventEmitter<IChannelEventInner> = new EventEmitter<IChannelEventInner>();

  constructor(private platform: Platform) {
    EventService.instance = this;

    this.platform.resize.subscribe(() => this.publish(EventChannel.PlatformResize));
    this.platform.resume.subscribe(() => this.publish(EventChannel.AppResume));
    this.platform.pause.subscribe(() => this.publish(EventChannel.AppPause));
    window.addEventListener('hashchange', (hashRef: HashChangeEvent) =>
      this.publish(EventChannel.UrlHashChange, this.mapHashChangeEvent(hashRef)), false
    );

    window.addEventListener('keyboardWillShow', () => this.publish(EventChannel.KeyboardWillShow));
    window.addEventListener('keyboardWillHide', () => this.publish(EventChannel.KeyboardWillHide));
    window.addEventListener('keyboardDidShow', () => this.publish(EventChannel.KeyboardDidShow));
    window.addEventListener('keyboardDidHide', () => this.publish(EventChannel.KeyboardDidHide));

  }

  public all(): Observable<IChannelEventInner> {
    return <Observable<IChannelEventInner>>this.emitter;
  }

  public channel(...channel: EventChannel[]): Observable<any> {

    return (<Observable<IChannelEventInner>>this.emitter)
      .pipe(
        filter((evt: IChannelEventInner) => channel.indexOf(evt.ch) > -1),
        map((evt: IChannelEventInner) => evt.msg)
      );
  }

  public publish(channel: EventChannel = null, message: any = null) {
    this.emitter.emit({ch: channel, msg: message});
  }

  private mapHashChangeEvent(event: HashChangeEvent): IChannelHashChangeEvent {
    return {
      oldHash: event.oldURL.split('#')[1],
      newHash: event.newURL.split('#')[1]
    };
  }

}



export interface IChannelEventInner {
  ch: EventChannel;
  msg: any;
}

export enum EventChannel {
  PlatformResize,
  AppResume,
  AppPause,
  UrlHashChange,
  KeyboardWillShow,
  KeyboardWillHide,
  KeyboardDidShow,
  KeyboardDidHide,

  ProfileUpdate,

  UserLogin,
  UserLogout
}


export interface IChannelShowAlertOptions extends AlertOptions {
  id: string;
  onDidDismiss?: (data: any, role: string) => void;
}

export interface IChannelHashChangeEvent {
  oldHash: string;
  newHash: string;
}
