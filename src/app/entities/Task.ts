export class Task {
  id: number;
  title: string;
  mark: boolean;

  constructor(id: number, title: string, mark: boolean) {
    this.id = id;
    this.title = title;
    this.mark = mark;
  }

  public setMark(mark: boolean) {
    this.mark = mark;
  }

  public setTitle(title: string) {
    this.title = title;
  }
}
