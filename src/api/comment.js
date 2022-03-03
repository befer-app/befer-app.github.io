import { getUserData } from '../util.js';
import * as api from './api.js';
import { createPointer, endpoints } from './data.js'

export async function createComment(publicationId, comment) {
    const { id } = getUserData();

    comment.author = createPointer('_User', id);
    comment.publication = createPointer('Publication', publicationId);

    return api.post(endpoints.comments, comment);
}

export async function getCommentsByPublicationId(publicationId) {
    return api.get(endpoints.commentsByPublication(publicationId));
}