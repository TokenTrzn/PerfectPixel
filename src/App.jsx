import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Banner } from './components/banner/Banner'
import { DashBoard } from './components/dashboard/Dashboard'

function App() {

  return (
    <>
      <Header />
      <Banner />
      <DashBoard />
    </>
  )
}

export default App
