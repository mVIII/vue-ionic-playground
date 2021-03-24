import { createStore } from '@harlem/core';
import STATE from './state';

const NAME = 'token';

export const { state, getter, mutation } = createStore(NAME, STATE);
