import { Injectable } from '@angular/core';
import { AuthResource } from '../resources/auth.resource';
import {
  IAccessKeyData, IAccessKeyDataCreation, IGeneratePushPullTokensRequest,
  IGeneratePushPullTokensResponse, IProfile
} from '../app/declarations';
import { EventChannel, EventService } from './event.service';

@Injectable()
export class AuthService {

  profile: IProfile = null;

  get isLogged(): boolean {
    return !!this.profile;
  }

  constructor(private authResource: AuthResource, private eventService: EventService) {

  }

  async login(email: string, password: string): Promise<boolean> {

    try {
      await this.authResource.login({email, password});
      return true;
    } catch (e) {
      console.warn('Login error', e);
    }

    return false;

  }

  async loadProfile(): Promise<IProfile> {

    try {
      this.profile = await this.authResource.getProfile();
    } catch (e) {
      this.profile = null;
    }

    this.eventService.publish(EventChannel.ProfileUpdate, this.profile);

    return this.profile;
  }

  async getAccessKeys(): Promise<IAccessKeyData[]> {

    const keysMap = await this.authResource.getAccessKeys();

    const keys: IAccessKeyData[] = [];

    for (const key in keysMap) {
      keys.push({...keysMap[key], key});
    }

    return keys;

  }

  async createAccessKey(data: IAccessKeyDataCreation): Promise<IAccessKeyData> {

    const newKeyMap = await this.authResource.createAccessKey(data);

    const keys = Object.keys(newKeyMap);

    if (!keys.length) {
      return null;
    }

    return {...newKeyMap[keys[0]], key: keys[0]};

  }

  generatePushPullTokens(data: IGeneratePushPullTokensRequest): Promise<IGeneratePushPullTokensResponse> {
    return this.authResource.generatePushPullTokens(data)
  }

}
