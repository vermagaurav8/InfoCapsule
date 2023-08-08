import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_API_KEY;

export const capsuleApi = createApi({
    reducerPath: 'capsuleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', apiKey)
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')

            return headers
        }
    }),
    endpoints: (builder) => ({
        getCapsule: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=5`
        })
    })
});

export const { useLazyGetCapsuleQuery } = capsuleApi