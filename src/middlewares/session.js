import { getUserData } from '../util.js';

export default function addSession(ctx, next) {
    if (ctx.user == undefined) {
        updateSession.call(ctx);
    }
    ctx.updateSession = updateSession.bind(ctx);

    next();
}

function updateSession() {
    this.user = getUserData();
}