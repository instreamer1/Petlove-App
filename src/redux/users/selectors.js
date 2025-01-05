export const selectUser = state => state.users.user;
export const selectIsLoggedIn = state => state.users.isLoggedIn;
export const selectIsFavorite = (state, noticeId) =>
  state.users.favorites.some(fav => fav._id === noticeId);
export const selectNoticesFavorites = state => state.users.noticesFavorites;
export const selectFavorites = state => state.users.favorites;
export const selectPets = state => state.users.pets;
export const selectNoticesViewed = state => state.users.noticesViewed;
export const selectIsRefreshing = state => state.users.isRefreshing;
export const selectIsLoading = state => state.users.isLoading;
export const selectError = state => state.users.error;
