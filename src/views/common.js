import { html, classMap } from '../lib.js';

export const field = ({ label, name, placeholder, type = 'text', value = '', error }) => {
    if (type == 'textarea') {
        return html`        
        <label>${label}</label>
        <textarea class=${classMap({ error })} placeholder=${placeholder} name=${name} .value=${value}></textarea>`;
    } else {
        return html`
        <label>${label}</label>
        <input class=${classMap({ error })} type=${type} placeholder=${placeholder} name=${name} .value=${value}>
        ${error && error != true ? html`<p class="errorText">${error}</p>` : ''}`;
    }
}