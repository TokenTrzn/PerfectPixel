import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MyGallery } from './pages/MyGallery'
import { Header } from './components/header/Header'

function App() {

  return (
    <>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/myGallery' element={<MyGallery />} />
        </Routes>
      </Provider>
    </BrowserRouter>
    </>
  )
}

export default App
