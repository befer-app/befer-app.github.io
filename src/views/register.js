import { register } from '../api/user.js';
import { html, until } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { field } from './common.js';

const registerTemplate = (onSubmit, errors, data) => html`
<form @submit=${onSubmit}>
    <h2>Register</h2>
    <div class="on-dark">
        ${field({ label: 'First and last name', name: 'fullName', value: data.fullName, placeholder: 'John Jonsen', error: errors.fullName })}
    </div>
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
        const fieldNames = [ 'fullName', 'username', 'password', 'repeatPass', 'email' ];

        ctx.render(registerTemplate(createSubmitHandler(onSubmit, fieldNames), errors, data));
    }

    async function onSubmit({ fullName, username, password, repeatPass, email }, event) {
        try {
            if (username == '' || password == '' || repeatPass == '' || fullName == '') {
                throw {
                    fullName: fullName == '' ? 'Full name is required!' : '',
                    username: username == '' ? 'Username is required!' : '',
                    email: email == '' ? 'Email is required!' : '',
                    password: password == '' ? 'Password is required!' : '',
                    repeatPass: repeatPass == '' ? 'Repeat password is required!' : ''
                };
            }

            if (password != repeatPass) {
                throw {
                    repeatPass: 'The passwords don\'t match!'
                }
            }

            SlickLoader.enable();

            await register(fullName, username, password, email);

            SlickLoader.disable();
            event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            SlickLoader.disable();

            if (err.code == 202) {
                err.username = err.message;
            } else if (err.code == 203) {
                err.email = err.message;
            }

            update(err, { username, email });
        }
    }
}