export class Task {
  id: number;
  title: string;
  mark: boolean;

  public setMark(mark: boolean) {
    this.mark = mark;
  }

  public setTitle(title: string) {
    this.title = title;
  }
}
