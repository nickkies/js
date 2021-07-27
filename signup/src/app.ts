import template from './app.template';
import { AnyObject } from './types';

export default class App {
  template = template;
  data: AnyObject;
  container: HTMLElement;
  fields: AnyObject;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];
  }

  public render = () => {
    this.container.innerHTML = this.template(this.data);
  }
}