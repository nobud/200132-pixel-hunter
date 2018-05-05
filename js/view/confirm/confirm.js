const CLASS_SHOW_CONFIRM = `confirm--show`;

const confirmTemplate = `
<div class="confirm confirm--hide">
	<div class="confirm__wrapper">
	  <h2 class="confirm__header">Внимание</h2>
		<p class="confirm__text">При переходе назад к приветственному экрану игра будет отменена, а ответы потеряны. Выполнить переход?</p>
		<button class="confirm-btn  confirm__ok">Да</button>
		<button class="confirm-btn  confirm__cancel">Нет</button>
	</div>
	<div class="confirm__overlay"></div>
</div>`;

const closeConfirm = (confirm) => {
  confirm.classList.remove(CLASS_SHOW_CONFIRM);
};

const showConfirm = (confirm) => {
  confirm.classList.add(CLASS_SHOW_CONFIRM);
};

export {confirmTemplate, showConfirm, closeConfirm};
