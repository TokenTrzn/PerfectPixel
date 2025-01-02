import { Banner } from '../components/banner/Banner'
import { Dashboard } from '../components/dashboard/Dashboard'
import { useState } from 'react'

export const Home = () => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchQuery = (query) => {
        setSearchQuery(query)
    }

    return (
        <>
            <Banner onSearch={handleSearchQuery} />
            <Dashboard searchQuery={searchQuery} />
        </>
    )
}