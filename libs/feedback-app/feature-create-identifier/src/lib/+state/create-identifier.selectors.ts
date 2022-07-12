import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CreateIdentifierState,
  FEATURE_KEY,
} from './create-identifier.reducer';

export const selectState =
  createFeatureSelector<CreateIdentifierState>(FEATURE_KEY);

  export const selectCreatingIdentifier = createSelector(
    selectState,
    (state) => state.creatingIdentifier
  );


  export const selectIdentifier = createSelector(
    selectState,
    (state) => state.identifier
  );
