const div = document.createElement('div');
const list = document.createElement('ul');
list.addEventListener('click', onClick);

div.id = 'notification';
div.appendChild(list);

document.body.prepend(div);

export function notify(message, classType) {
    const liItem = document.createElement('li');
    liItem.classList.add('notifications');
    liItem.classList.add(classType);
    liItem.textContent = message;

    const divEl = document.createElement('div');
    divEl.textContent = '\u2716';
    liItem.appendChild(divEl);

    list.appendChild(liItem);

    setTimeout(() => liItem.remove(), 30000);
}

function onClick(event) {
    if (event.target.tagName == 'LI') {
        event.target.remove();
    } else if (event.target.tagName == 'DIV') {
        event.target.parentNode.remove();
    }
}