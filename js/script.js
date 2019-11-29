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

	parentElement.appendChild(inputElement);
	parentElement.removeChild(targetElement);

	inputElement.select();

	inputElement.addEventListener('keyup', function(event) {
		console.log(event);
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

	inputElement.addEventListener('blur', function(argument) {
		parentElement.appendChild(targetElement);
		parentElement.removeChild(inputElement);
	});
}