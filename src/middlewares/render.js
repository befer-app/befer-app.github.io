import { logout } from '../api/user.js';
import { render } from '../lib.js';
import { getUserData } from '../util.js';
import { notify } from './notify.js';

const root = document.querySelector('main');

function boundRender(content) {
    render(content, root);
}

export function decorateContext(ctx, next) {
    ctx.render = boundRender;
    ctx.updateUserNav = updateUserNav;
    ctx.notify = notify;

    updateUserNav();
    next();
}

export function updateUserNav() {
    document.querySelector('nav').style.display = 'flex';

    const userData = getUserData();
    const userNavEls = Array.from(document.querySelectorAll('li.user'));
    const guestNavEls = Array.from(document.querySelectorAll('li.guest'));

    if (userData) {
        userNavEls.forEach(el => el.style.display = 'inline-block');
        guestNavEls.forEach(el => el.style.display = 'none');
    } else {
        userNavEls.forEach(el => el.style.display = 'none');
        guestNavEls.forEach(el => el.style.display = 'inline-block');
    }
}