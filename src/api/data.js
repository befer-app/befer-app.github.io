import { getUserData } from '../util.js';

export const endpoints = {
    publications: '/classes/Publication',
    publicationDetails: (id) => `/classes/Publication/${id}?include=owner`,
    publicationById: (id) => `/classes/Publication/${id}`,
    comments: '/classes/Comment',
    commentsByPublication: (publicationId) => `/classes/Comment?where=${createPointerQuery('publication', 'Publication', publicationId)}&include=author`,
};

export function createPointerQuery(propName, className, objectId) {
    return createQuery({[propName]: createPointer(className, objectId)});
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}

export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    }
}

export function addOwner(record) {
    const userData = getUserData();
    
    if (userData) {
        const { id } = userData;
        record.owner = createPointer('_User', id);
    }

    return record;
}