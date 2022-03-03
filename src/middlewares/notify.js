const div = document.createElement('div');
const list = document.createElement('ul');
list.addEventListener('click', onClick);

div.id = 'notification';
div.appendChild(list);

document.body.appendChild(div);

export function notify(message) {
    const liItem = document.createElement('li');
    liItem.classList.add('notifications');
    liItem.classList.add('error');
    liItem.textContent = message;

    list.appendChild(liItem);

    setTimeout(() => liItem.remove(), 3000);
}

function onClick(event) {
    if (event.target.tagName == 'LI') {
        event.target.remove();
    }
}