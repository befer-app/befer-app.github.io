import * as api from './api.js';
import { addOwner, endpoints } from './data.js'

export async function getPublications() {
    return api.get(endpoints.publications);
}

export async function getPublicationById(id) {
    return api.get(endpoints.publicationDetails(id));
}

export async function createPublication(publication) {
    addOwner(publication);

    return api.post(endpoints.publications, publication);
}

export async function updatePublication(id, publication) {
    return api.put(endpoints.publicationById(id), publication);
}

export async function deletePublication(id) {
    return api.del(endpoints.publicationById(id));
}