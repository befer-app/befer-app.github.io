import { deletePublication, getPublicationById } from '../api/publication.js';
import { html, until } from '../lib.js';
import { notify } from '../middlewares/notify.js';

const detailsTemplate = (itemPromise) => html`
<div class="container">
    ${until(itemPromise)}
</div>`;

const itemTemplate = (publication, onDelete, isOwner) => html`
<section class="details">
    <h1 class="margin-b20"><i>Post title:</i> ${publication.title}</h1>
    <div class="textCenter">
        <img src=${publication.beforeImgUrl} />
        <img src=${publication.afterImgUrl} />
    </div>
    <div class="margin-t20">
        <hr style="width:500px; margin: auto;">
    </div>
    <div class="textCenter margin-t20">
        <h3>Post Description</h3>
        <p>${publication.description}</p>
        <div class="buttons">
            ${isOwner ? html`
            <a @click=${onDelete} class="btn delete" href="javascript:void(0)">Delete</a>
            <a class="btn edit" href="/edit/${publication.objectId}" }>Edit</a>`
            : ''}
            <!-- <span class="liked">You have already liked this post!</span> -->
            <a class="btn like" href="/like/${publication.objectId}">Like</a>
        </div>
    </div>
</section>

<section class="details">
    <div class="textCenter">
        <h3>Post Author</h3>
        <p>Username: ${publication.owner.username}</p>
        <p>Full name: ${publication.owner.fullName}</p>
        <p>Email: ${publication.owner.email}</p>
    </div>
</section>`;

export function detailsPage(ctx) {
    const id = ctx.params.id;
    let userId;

    if (ctx.user) {
        userId = ctx.user.id;
    } else {
        notify('You should be logged in to see post\'s details!', 'error');
        return ctx.page.redirect('/login');
    }

    ctx.render(detailsTemplate(loadItem(id, onDelete, userId)));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');

        if (choise) {
            SlickLoader.enable();
            await deletePublication(id);
            SlickLoader.disable();

            notify('The post was deleted successfully!', 'success');

            ctx.page.redirect('/');
        }
    }
}

async function loadItem(id, onDelete, userId) {
    SlickLoader.enable();

    const publication = await getPublicationById(id);
    const isOwner = publication.owner.objectId == userId;

    SlickLoader.disable();

    return itemTemplate(publication, onDelete, isOwner);
}