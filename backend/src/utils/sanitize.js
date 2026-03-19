import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHTML(dirty) {
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ['b','i','em','strong','a','p','ul','ol','li','br'],
    ALLOWED_ATTR: ['href','target', 'rel'],
  });
}