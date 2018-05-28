// Module imports.
import Esdoc from './authorities/esdoc.js';
import Wcrp from './authorities/wcrp.js';

// WCRP controlled vocabulary authority.
export let WCRP = null;

// ES-DOC controlled vocabulary authority.
export let ESDOC = null;

// Application mode.
const APP_MODE = (() => {
    if (window.location.host && window.location.host.indexOf('es-doc.org') >= 0) {
        if (window.location.host.indexOf('test') >= 0) {
            return 'test';
        }
        return 'prod';
    }
    return 'dev';
})();

// Api URL.
const URL_API = {
    "dev": "http://localhost:5010",
    "test": "https://test-api-pyessv.es-doc.org",
    "prod": "https://api-pyessv.es-doc.org"
}[APP_MODE] + "/1/retrieve";

// Module initialiser.
export const initialise = (onSuccess, onError) => {
    $.get(URL_API)
        .done((data) => {
            _.each(data.data, (a) => {
                switch(a.canonicalName) {
                    case 'wcrp':
                        WCRP = new Wcrp(a);
                        break;
                    case 'esdoc':
                        ESDOC = new Esdoc(a);
                        break;
                }
            });
            onSuccess();
        })
        .fail(() => {
            onError();
        });
};
