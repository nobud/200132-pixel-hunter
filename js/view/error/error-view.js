import {ViewAbstract} from '../view-abstract';

class ErrorView extends ViewAbstract {

  constructor(notice) {
    super();
    this.notice = notice;
  }

  get htmlTemplate() {
    return `
      <div class="end">
        <p>${this.notice.message}</p>
      </div>`;
  }
}

export default ErrorView;
