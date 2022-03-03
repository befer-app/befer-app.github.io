import { createPublication } from '../api/publication.js';
import { html } from '../lib.js';
import { field } from './common.js';
import { createSubmitHandler } from '../util.js';

const createTemplate = (onSubmit, errors, data) => html`
<form @submit=${onSubmit} class="publication-form">
    <h1>Create Post</h1>
    <div>
        ${field({ label: 'Title', name: 'title', placeholder: 'Post title', value: data.title, error: errors.title})}
    </div>
    <div>
        ${field({ label: '"Before" image URL', name: 'beforeImgUrl', placeholder: 'Before Image Url', value: data.beforeImgUrl, error: errors.beforeImgUrl })}
    </div>
    <div>
        ${field({ label: '"After" image URL', name: 'afterImgUrl', placeholder: 'After Image Url', value: data.afterImgUrl, error: errors.afterImgUrl })}
    </div>
    <div>
        ${field({ label: 'Description', name: 'description', placeholder: 'Some nice description', type: 'textarea', value: data.description, error: errors.description })}
    </div>
    <div class="check">
        <input type="checkbox" id="check-box" checked="checked" name="checkbox">
        <label>Public</label>
    </div>
    <button class="btn" type="submit">Submit</button>
</form>`;

export function createPage(ctx) {
    const fieldNames = ['title', 'description', 'beforeImgUrl', 'afterImgUrl'];

    update();

    function update(errors = {}, data = {}) {
        ctx.render(createTemplate(createSubmitHandler(onSubmit, fieldNames), errors, data));
    }

    async function onSubmit(data, event) {
        try {
            SlickLoader.enable();

            const formData = new FormData(event.target);
            const isPublic = formData.get('checkbox') == null ? false : true;
            data['isPublic'] = isPublic;

            if (data.title == '' || data.beforeImgUrl == '' || data.afterImgUrl == '') {
                throw {
                    title: data.title == '' ? 'Title is required!' : '',
                    beforeImgUrl: data.beforeImgUrl == '' ? '"Before" image URL is required!' : '',
                    afterImgUrl: data.afterImgUrl == '' ? '"After" image URL is required!' : '',
                }
            }

            if (data.title.length < 4 || data.beforeImgUrl.length < 10 || data.afterImgUrl.length < 10) {
                throw {
                    title: data.title.length < 4 ? 'Title should be atleast 4 symbols long!' : '',
                    beforeImgUrl: data.beforeImgUrl.length < 10 ? '"Before" image URL should be atleast 10 symbols long!' : '',
                    afterImgUrl: data.afterImgUrl.length < 10 ? '"After" image URL should be atleast 10 symbols long!' : '',
                }
            }

            const { objectId } = await createPublication(data);

            SlickLoader.disable();
            ctx.page.redirect(`/details/${objectId}`);
        } catch (err) {
            SlickLoader.disable();

            update(err, data);
        }
    }
}