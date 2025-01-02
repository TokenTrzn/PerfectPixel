import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateImages } from '../dashboard/DashboardSlice'

export const fetchSearchResults = createAsyncThunk(
    'images/fetchSearchResults',
    async (query, { dispatch }) => {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=20&page=1&client_id=uoxX9Z7KM0QQXlfHCbh0e95o5UMq05AMit4q7yfx4Ic`
        );
        if (response.ok) {
            const data = await response.json();
            return data.results.map((item) => ({
                created_at: item.created_at,
                width: item.width,
                height: item.height,
                alt_description: item.alternative_slugs.es,
                url: item.urls.small,
                download: item.urls.full,
                likes: item.likes,
                description: item.description,
            }))

        } else {
            return []
        }
    }
);