import { heroApi } from "../../hero_service";

const authHeroEndpoint = heroApi.injectEndpoints({
  endpoints: (builder) => ({
    heros: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useHerosQuery } = authHeroEndpoint;
