import { Routes,Route } from "react-router-dom"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import Profile from "./pages/Profile"

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow">
          <Routes>
           <Route path="/" element={<Home/>}></Route>
             <Route path="/movies" element={<Movies/>}></Route>
             <Route path="/movies/:movieID" element={<MovieDetails/>}></Route>
             <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
