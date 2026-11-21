// Данные главы 3 для текущего изучаемого языка: английский (words3.js) или чешский (words3cz.js).
import { TARGET } from '../state.js';
import * as EN from './words3.js';
import * as CZ from './words3cz.js';

export const CH3 = TARGET === 'cz' ? CZ : EN;
