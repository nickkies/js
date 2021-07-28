import template from './app.template';
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit } from './constant';
import { AnyObject } from './types';
import { TextField } from './views';

export default class App {
  template = template;
  data: AnyObject;
  container: HTMLElement;
  fields: AnyObject[];
  active: boolean = false;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];

    this.initialize();

    setInterval(this.validFieldMonitor, 1000/30);  
  }

  private initialize = () => {
    const nameField = new TextField('#required-fields', {
      id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요.', require: true,
    });

    nameField.addValidateRule(CantContainWhitespace);
    nameField.addValidateRule(CantStartNumber);
    nameField.addValidateRule(MinimumLengthLimit(1));

    this.fields.push(nameField);
  }

  private validFieldMonitor = () => {
    const btnJoin = this.container.querySelector('#btn-join') as HTMLElement;

    if ( this.fields.filter(field => field.isValid).length === this.fields.length) {
      this.active = true;
      btnJoin.classList.remove('bg-gray-300');
      btnJoin.classList.add('bg-gray-500');
    } else {
      btnJoin.classList.remove('bg-gray-500');
      btnJoin.classList.add('bg-gray-300');
    }
  }

  private onSubmit = (e: Event) => {
    e.preventDefault();

    if ( !this.active ) return;

    const submitData: AnyObject = this.fields
      .map(field => ({ [field.name]: field.value }))
      .reduce((a, b) => ({ ...a, ...b }), {});

    console.log(submitData);
  }

  public render = () => {
    this.container.innerHTML = this.template(this.data);
    this.fields.forEach(field => {
      field.render(true);
    });

    this.container.addEventListener('submit', this.onSubmit);
  }
}