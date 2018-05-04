import {
  IResourceActionInner,
  IResourceMethod, ResourceAction, ResourceHandler, ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';
import { Injectable } from '@angular/core';
import { IAppDataCreation, IChannelDataCreation } from '../app/declarations';
import { App } from '../models/App';
import { Channel } from '../models/Channel';
import { BaseResource } from './base.resource';
import { EventService } from '../services/event.service';


@Injectable()
@ResourceParams({
  pathPrefix: '/v1/app'
})
export class AppsResource extends BaseResource {

  constructor(handler: ResourceHandler, eventService: EventService) {
    super(handler, eventService);
  }

  @ResourceAction()
  queryApp: IResourceMethod<void, App[]>;


  @ResourceAction({
    method: ResourceRequestMethod.Post
  })
  createApp: IResourceMethod<IAppDataCreation, App>;

  @ResourceAction({
    path: '/{!appId}/channel',
    method: ResourceRequestMethod.Post,
    resultFactory: item => new Channel(item)
  })
  createChannel: IResourceMethod<IChannelDataCreation, Channel>;

  $resultFactory(data: any, options?: IResourceActionInner): any {
    return new App(data);
  }

}
