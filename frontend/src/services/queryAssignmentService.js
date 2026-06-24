import api from "./api";

export const assignRole = (queryId, roleId) =>
  api.patch(`/query-definitions/${queryId}/assign-role`, {
    roleId,
  });

export const assignUser = (queryId, userId) =>
  api.patch(`/query-definitions/${queryId}/assign-user`, {
    userId,
  });

export const denyUser = (queryId, userId) =>
  api.patch(`/query-definitions/${queryId}/deny-user`, {
    userId,
  });

export const removeRole = (queryId, roleId) =>
  api.patch(`/query-definitions/${queryId}/remove-role`, {
    roleId,
  });

export const removeUser = (queryId, userId) =>
  api.patch(`/query-definitions/${queryId}/remove-user`, {
    userId,
  });

export const removeDeniedUser = (queryId, userId) =>
  api.patch(`/query-definitions/${queryId}/remove-denied-user`, {
    userId,
  });
