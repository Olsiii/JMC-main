import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import PracticeAreasPage from './pages/PracticeAreas';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { LanguageProvider } from './context/LanguageContext';
import usePageMeta from './hooks/usePageMeta';

// Old /blog/:slug links. The hosting config also returns 301s for these.
function OldInsightRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/insights/${slug}`} replace />;
}

function NotFoundPage() {
  usePageMeta({ title: 'Page not found | JMC Legal' });

  return (
    <div className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="label-caps text-accent">404</p>
      <h1 className="mt-4 font-serif text-[48px] leading-tight text-ink">Page not found</h1>
      <Link to="/" className="link-more mt-8">
        return to the home page
      </Link>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="label-caps sr-only z-50 bg-ink px-4 py-3 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
            >
              Skip to content
            </a>
            <ScrollToTop />
            <Header />
            <main id="main" className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/the-firm" element={<AboutPage />} />
                <Route path="/practice-areas" element={<PracticeAreasPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/insights" element={<BlogPage />} />
                <Route path="/insights/:slug" element={<BlogPost />} />
                <Route path="/about" element={<Navigate to="/the-firm" replace />} />
                <Route path="/blog" element={<Navigate to="/insights" replace />} />
                <Route path="/blog/:slug" element={<OldInsightRedirect />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
