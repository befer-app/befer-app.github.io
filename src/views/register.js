import { register } from '../api/user.js';
import { html, until } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { field } from './common.js';

const registerTemplate = (onSubmit, errors, data) => html`
<form @submit=${onSubmit}>
    <h2>Register</h2>
    <div class="on-dark">
        ${field({ label: 'Username', name: 'username', value: data.username, placeholder: 'John93', error: errors.username })}
    </div>
    <div class="on-dark">
        ${field({ label: 'Email', name: 'email', type: 'email', value: data.email, placeholder: 'John93@gmail.com', error: errors.email })}
    </div>
    <div class="on-dark">
        ${field({ label: 'Password', name: 'password', type: 'password', placeholder: '*********', error: errors.password})}
    </div>
    <div class="on-dark">
        ${field({ label: 'Repeat Password', name: 'repeatPass', type: 'password', placeholder: '*********', error: errors.repeatPass})}
    </div>
    <button class="btn" type="submit">Register</button>
</form>`;

export function registerPage(ctx) {
    update();

    function update(errors = {}, data = {}) {
        const fieldNames = [ 'username', 'password', 'repeatPass', 'email' ];

        ctx.render(registerTemplate(createSubmitHandler(onSubmit, fieldNames), errors, data));
    }

    async function onSubmit({ username, password, repeatPass, email }, event) {
        try {
            if (username == '' || password == '' || repeatPass == '') {
                throw {
                    username: username == '' ? 'Username is required!' : '',
                    email: email == '' ? 'Email is required!' : '',
                    password: password == '' ? 'Password is required!' : '',
                    repeatPass: repeatPass == '' ? 'Repeat password is required!' : ''
                };
            }

            SlickLoader.enable();

            await register(username, password, email);

            SlickLoader.disable();
            event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            SlickLoader.disable();

            update(err, { username, email });
        }
    }
}