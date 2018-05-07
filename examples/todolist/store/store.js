import { createStore } from '../appstateme';
import { getItems } from '../utils/utils';

// create a store with default items
// loaded from the localStorage
export default createStore({ items: getItems() });
