import { Demo, Hero, Footer } from "./components"
import "./App.css";


const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="app">
        <Hero />
        <Demo />
        <Footer />
      </div>
    </main>
  )
}

export default App