import { heroApi } from "../../hero_service";

const authHeroEndpoint = heroApi.injectEndpoints({
  endpoints: (builder) => ({
    heros: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    heroSearch: builder.query({
      query:(name)=>({
        url:`/search/${name}`
      })
    })
  }),
});

export const { useHerosQuery,useHeroSearchQuery } = authHeroEndpoint;
