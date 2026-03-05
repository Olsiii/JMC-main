import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import PracticeAreasPage from './pages/PracticeAreas';
import ContactPage from './pages/Contact';
import './App.css';

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-2">404</h1>
      <p className="text-[#4A4A4A] mb-6">Page not found</p>
      <Link to="/" className="text-[#D4AF37] font-semibold hover:text-[#B59025] transition-colors">
        Return to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice-areas" element={<PracticeAreasPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
