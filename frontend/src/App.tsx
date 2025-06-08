import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/investor-dashboard/providers/ThemeProvider'
import { Header } from './components/investor-dashboard/Header';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

// Main layout component that includes the Header
const AppLayout = () => (
  <div className="bg-background dark:bg-background-dark min-h-screen">
    <Header />
    <main>
      <Outlet /> {/* Child routes will render here */}
    </main>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;