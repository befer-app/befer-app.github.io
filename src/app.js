import { page } from './lib.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { logout } from './api/user.js';
import addSession from './middlewares/session.js';
import { decorateContext, updateUserNav } from './middlewares/render.js';
import { registerPage } from './views/register.js';

page(addSession);
page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);

page.start();

document.getElementById('logoutBtn').addEventListener('click', onLogout);

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}