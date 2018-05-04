export interface IProfile {

}

export interface IApp {
  _id?: string;
  title?: string;
  description?: string;
  channels?: IChannel[];
}

export interface IChannel {
  _id?: string;
  title?: string;
  description?: string;
  code?: string;
  biggestVersion?: string;
  currentVersion?: string;
  versions?: string[];
}


export interface IAccessKeysMap {
  [key: string]: IAccessKeyData;
}


export interface IAppDataCreation {
  title: string;
  description?: string;
}

export interface IAccessKeyDataCreation {
  title: string;
  description: string;
  type: AccessKeyType;
}

export interface IChannelDataCreation {
  appId: string;
  title: string;
  description?: string;
}


export enum AccessKeyType {
  BackOffice = 'backOffice',
  Push = 'push',
  Pull = 'pull'
}

export interface IAccessKeyData {
  key?: string;
  type: AccessKeyType;
  creationTime: Date;
  lastActivity: Date;
  title: string;
  description: string;
}


export interface IModalGeneralEditOptions {
  title: string;
  withCode?: boolean;
  withTypes?: boolean;
  defType?: AccessKeyType;
  dataTitle?: string;
  dataDescription?: string;
  saveHandler(data: IModalGeneralEditSaveDataOptions): Promise<any>;
}



export interface IModalGeneralEditSaveDataOptions {
  title: string;
  description: string;
  code?: string;
  type?: AccessKeyType;
}


export interface IGeneratePushPullTokensRequest {
  appId: string;
  pushKey: string;
  pullKey: string;
}

export interface IGeneratePushPullTokensResponse {
  pushToken: string;
  pullToken: string;
}

export interface IConfigPushPull {
  apiServer: string;
  pushToken: string;
  pullToken: string;
  appId: string;
  channels: {[channel: string]: string};
  channel: string;
  updateMethod: string;
}
