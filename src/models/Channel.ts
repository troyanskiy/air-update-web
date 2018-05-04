import { ResourceModel } from '@ngx-resource/core';
import { pick } from 'lodash';

import { AppsResource } from '../resources/apps.resource';
import { IApp, IChannel } from '../app/declarations';

export class Channel extends ResourceModel implements IChannel {

  protected static methodQuery: string = 'queryChannel';
  protected static methodGet: string = 'getChannel';
  protected static methodCreate: string = 'createChannel';
  protected static methodUpdate: string = 'updateChannel';
  protected static methodRemove: string = 'removeChannel';

  readonly $resource = AppsResource;

  _id: string;
  title: string;
  description: string;
  code: string;
  biggestVersion: string;
  currentVersion: string;
  versions: string[];

  constructor(data?: IApp) {

    super();

    if (data) {
      this.$setData(data);
    }

  }

  toJSON() {
    return pick(this, ['_id', 'title', 'description', 'code']);
  }

  protected isNew(): boolean {
    return !(this as any)['_id'];
  }


}
