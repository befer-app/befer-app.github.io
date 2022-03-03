import { getPublications } from '../api/publication.js';
import { html, until } from '../lib.js';

const homeTemplate = (publicationPromise) => html`
<section class="main container">
    <h1>The Best Network for Sharing Your "Before and After" Photography</h1>
    <h2>Share your progress, renovation or great achievement and <u>Befer</u> Your Life</h2>
</section>
<section class="container">
    <div class="aux">
        <h1>Posts</h1>
        <div class="home-buttons"> 
            <a class="btn create-play" href="/create">Create Post</a>
            <a class="btn create-play" href="/sort">Sort by Date</a>
            <a class="btn create-play" href="/sort">Sort by Likes</a>
        </div>
    </div>
    <div class="publications-container">

    ${until(publicationPromise)}

    </div>
</section>`;

const publicationTemplate = (publication) => html`
<div>
    <div class="home-image">
        <img src="${publication.beforeImgUrl}" alt="Card image cap">
    </div>
    <div class="info">
        <h4>${publication.title}</h4>
        <div class="info-buttons">
            <a class="btn details" href="/details/${publication.objectId}">See "After"</a>
            <span class="likes">3 likes</span>
        </div>
    </div>
</div>`;

export async function homePage(ctx) {
    ctx.render(homeTemplate(loadPublications()));
}

async function loadPublications() {
    SlickLoader.enable();
    
    const { results: publications } = await getPublications();

    SlickLoader.disable();
    
    if (publications.length == 0) {
        return html`<h4>No posts yet... You can <a href="/create">create</a> the first one!</h4>`;
    } else {
        return publications.map(publicationTemplate);
    }
}