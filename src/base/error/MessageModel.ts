class MessageModel {
  constructor(public message: string) {}
}

export class MessageWithDataModel {
  constructor(public message: string, public data: any) {}
}

export default MessageModel;
