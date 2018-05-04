import { ResourceModel } from '@ngx-resource/core';
import { pick } from 'lodash';

import { AppsResource } from '../resources/apps.resource';
import { IApp, IChannel } from '../app/declarations';

export class App extends ResourceModel implements IApp {

  protected static methodQuery: string = 'queryApp';
  protected static methodGet: string = 'getApp';
  protected static methodCreate: string = 'createApp';
  protected static methodUpdate: string = 'updateApp';
  protected static methodRemove: string = 'removeApp';

  readonly $resource = AppsResource;

  _id: string;
  title: string;
  description?: string;
  channels: IChannel[];

  constructor(data?: IApp) {

    super();

    if (data) {
      this.$setData(data);
    }

  }

  toJSON() {
    return pick(this, ['_id', 'title', 'description']);
  }

  protected isNew(): boolean {
    return !(this as any)['_id'];
  }

}
