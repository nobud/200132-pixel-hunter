import ViewAbstract from '../view-abstract';
import {showElement} from '../../util/util';

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

const showError = (error) => {
  const errorView = new ErrorView(error);
  showElement(errorView.elementDOM);
};

export default showError;
