import { createReducer, on } from '@ngrx/store';
import { compare } from './map.actions';

export const initialState = {

};

const _mapReducer = createReducer(
  initialState,
  // on(increment, (state) => state + 1),
  // on(decrement, (state) => state - 1),
  // on(reset, (state) => 0),
  on(compare, (state,{compareOption})=> ({compareOption}))
);

export function mapReducer(state, action) {
  return _mapReducer(state, action);
}


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/