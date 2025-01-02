import { DashboardFavorites } from "../components/dashboard_favorites/DashboardFavorites"
import { BannerFavorites } from "../components/banner_favorites/BannerFavorites"

export const MyGallery = () => {

    return (
        <>
            <BannerFavorites />
            <DashboardFavorites />
        </>
    )
}