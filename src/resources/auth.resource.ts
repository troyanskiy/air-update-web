import {
  IResourceMethod,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';
import { Injectable } from '@angular/core';
import {
  IAccessKeyDataCreation,
  IAccessKeysMap,
  IGeneratePushPullTokensRequest,
  IGeneratePushPullTokensResponse, IProfile
} from '../app/declarations';
import { BaseResource } from './base.resource';
import { EventService } from '../services/event.service';


@Injectable()
@ResourceParams({
  pathPrefix: '/v1/auth'
})
export class AuthResource extends BaseResource {

  constructor(handler: ResourceHandler, eventService: EventService) {
    super(handler, eventService);
  }

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/login',
    query: {
      session: 1
    }
  })
  login: IResourceMethod<ILoginData, any>;

  @ResourceAction({
    path: '/access-keys'
  })
  getAccessKeys: IResourceMethod<void, IAccessKeysMap>;


  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/access-keys'
  })
  createAccessKey: IResourceMethod<IAccessKeyDataCreation, IAccessKeysMap>;

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/generate-tokens'
  })
  generatePushPullTokens: IResourceMethod<IGeneratePushPullTokensRequest, IGeneratePushPullTokensResponse>;

  @ResourceAction({
    path: '/profile',
    ignoreAuth: true
  })
  getProfile: IResourceMethod<void, IProfile>;

}

export interface ILoginData {
  email: string;
  password: string;
}
