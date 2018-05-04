import { Resource, ResourceHandler } from '@ngx-resource/core';
import { EventService } from '../services/event.service';

export class BaseResource extends Resource {

  constructor(handler: ResourceHandler, protected eventService: EventService) {
    super(handler);
  }

}
