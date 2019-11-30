document.body.addEventListener('click', clickHandler);

function clickHandler(event) {
	let targetElement = event.target,
		parentElement = targetElement.parentNode;

	if (!targetElement.hasAttribute('data-editable')) return;

	event.preventDefault();

	let targetType = targetElement.getAttribute('data-editable');

	let inputElement = document.createElement('input');
	inputElement.setAttribute('type', targetType);
	inputElement.value = targetElement.innerText;
	inputElement.classList.add('form-control');

	let submitBtn = createButton({
		icon: 'glyphicon glyphicon-ok',
		style: 'btn btn-primary btn-xs',
		handler: function() {
			targetElement.innerText = inputElement.value;
		}
	});

	let cancelBtn = createButton({
		icon: 'glyphicon glyphicon-remove',
		style: 'btn btn-danger btn-xs'
	});

	parentElement.appendChild(inputElement);
	parentElement.removeChild(targetElement);
	parentElement.appendChild(submitBtn);
	parentElement.appendChild(cancelBtn);

	inputElement.select();

	inputElement.addEventListener('keyup', function(event) {
		switch(event.which) {
			case 13: {
				targetElement.innerText = inputElement.value;
				inputElement.blur();
				break;
			}
			case 27: {
				inputElement.blur();
				break;
			}
		}
	});

	inputElement.addEventListener('blur', function(event) {
		parentElement.appendChild(targetElement);
		parentElement.removeChild(inputElement);
		parentElement.removeChild(submitBtn);
		parentElement.removeChild(cancelBtn);
	});
}

function createButton(config) {
	let btn = document.createElement('button');

	if (config.style) btn.classList.add(...config.style.split(' '));

	if (config.icon) {
		let span = document.createElement('span');
		span.classList.add(...config.icon.split(' '));
		btn.appendChild(span);
	}

	if (config.handler) btn.addEventListener('mousedown', config.handler);

	return btn;
}

/*
ET: 3 часа 

АТ: 2 часа 37 минут

note: Прошло 2 часа и кнопки по-прежнему не работают из-за того, что в слушателе 
	blur-a я их удаляю и соответственно слушатель click на кнопках не срабатывает.

note: после написания предыдущей заметки пришла гениальная мысль загуглить порядок
	event-ов. Надо вешаться не на click, а на mousedown.
*/ 