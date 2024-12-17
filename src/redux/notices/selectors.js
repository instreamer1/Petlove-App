import { createSelector } from '@reduxjs/toolkit';

export const selectNotices = state => state.notices.notices;
export const selectFilters = state => state.notices.filters;
export const selectSearchQuery = (state) => state.notices.searchQuery;
export const selectCategories = (state) => state.notices.categories;
export const selectSexOptions = (state) => state.notices.sexOptions;
export const selectSpeciesOptions = (state) => state.notices.speciesOptions;
export const selectLocations  = (state) => state.notices.locations
export const selectCurrentNotice = state => state.notices.currentNotice;
export const selectFavorites = state => state.notices.favorites;
export const selectNoticesCurrentPage = state => state.notices.currentPage;
export const selectNoticesTotalPages = state => state.notices.totalPages;
export const selectNoticesLoading = state => state.notices.loading;
export const selectNoticesError = state => state.notices.error;


export const selectFilteredCategories = createSelector(
    [selectCategories],
    categories => categories.filter(category => category.active)
  );