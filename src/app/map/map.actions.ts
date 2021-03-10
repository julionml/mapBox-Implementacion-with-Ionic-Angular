import { createAction,props } from '@ngrx/store';

export const compare = createAction('[Map Component] Compare',props<{compareOption: string}>());


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/