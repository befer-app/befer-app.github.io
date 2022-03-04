import { createPublication } from '../api/publication.js';
import { html } from '../lib.js';
import { field } from './common.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (onSubmit, errors, data) => html`
<div class="container">

    <section class="details">
        <h1>Publication title: Who's Afraid of Virginia Woolf? by Edward Albee</h1>
        <div>
            <img src="https://media.timeout.com/images/103727744/380/285/image.jpg" />
        </div>
    </section>

    <section class="details">
        <h3>Publication Description</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, et ex. Dignissimos
            voluptatum recusandae quos. Eum beatae soluta velit voluptas hic incidunt ab dolorem ipsam
            blanditiis laudantium. Distinctio, aliquam libero.</p>
        <div class="buttons">
            <a class="btn delete" href="">Delete</a>
            <a class="btn edit" href="">Edit</a>
            <span class="liked">You have already liked this play!</span>
            <a class="btn like" href="">Like</a>
        </div>
    </section>
</div>`;

export function detailsPage(ctx) {
    const fieldNames = ['title', 'description', 'beforeImgUrl', 'afterImgUrl'];

    update();

    function update(errors = {}, data = {}) {
        ctx.render(detailsTemplate(createSubmitHandler(onSubmit, fieldNames), errors, data));
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