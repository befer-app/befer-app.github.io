import { login } from '../api/user.js';
import { html, until } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { field } from './common.js';

const loginTemplate = (onSubmit, errors, data) => html`
<form @submit=${onSubmit}>
    <h2>Login</h2>
    <div>
        ${field({ label: 'Username', name: 'username', value: data.username, placeholder: 'Username', error:
        errors.username })}
    </div>
    <div>
        ${field({ label: 'Password', name: 'password', type: 'password', placeholder: 'Password', error:
        errors.password })}
    </div>
    <button class="btn" type="submit">Login</button>
    <div class="registerPath">You don't have a profile? &nbsp; <a class="registerPath" href="/register"><b><u>Join Befer now!</u></b></a></div>
</form>`;

export function loginPage(ctx) {
    update();

    function update(errors = {}, data = {}) {
        const fieldNames = ['username', 'password'];

        ctx.render(loginTemplate(createSubmitHandler(onSubmit, fieldNames), errors, data));
    }

    async function onSubmit({ username, password }, event) {
        try {
            if (username == '' || password == '') {
                throw {
                    username: username == '' ? 'The field is required!' : '',
                    password: password == '' ? 'The field is required!' : ''
                };
            }

            SlickLoader.enable();

            await login(username, password);

            SlickLoader.disable();
            event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            SlickLoader.disable();

            if (err.code == 101) {
                err.username = true;
                err.password = true;
            }

            update(err, { username });
        }
    }
}