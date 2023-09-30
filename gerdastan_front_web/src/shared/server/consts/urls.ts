export const urls = {
  person: () => '/v1/person',
  personId: (id: number) => `/v1/person/${id}`,
  personTree: () => '/v1/person/tree',
  personImage: (id: number) => `/v1/person/${id}/image`,
  createParent: (id: number) => `/v1/person/create-parent/${id}`,
};
