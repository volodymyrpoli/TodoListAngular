export class TodoListEvent {
  type: string;
  payload: any;
  handler: (acc: any[], payload: any) => any;

  constructor(type: string, payload: any, handler: (acc: any[], payload: any) => any) {
    this.type = type;
    this.payload = payload;
    this.handler = handler;
  }
}
