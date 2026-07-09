import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { LanguageProvider } from './context/LanguageContext';

import Home from './pages/Home';
import Page from './pages/Page';
import About from './pages/About';
import Issues from './pages/Issues';
import Endorsements from './pages/Endorsements';
import Volunteer from './pages/Volunteer';
import BearNecessities from './pages/BearNecessities';
import Resources from './pages/Resources';
import TheDenLive from './pages/TheDenLive';
import CubHouse from './pages/CubHouse';
import ArticlesAchievements from './pages/ArticlesAchievements'; // <-- Renamed import
import Events from './pages/Events'; // <-- New Import

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/issues" element={<Layout><Issues /></Layout>} />
      <Route path="/endorsements" element={<Layout><Endorsements /></Layout>} />
      <Route path="/volunteer" element={<Layout><Volunteer /></Layout>} />
      <Route path="/bear-necessities" element={<Layout><BearNecessities /></Layout>} />
      <Route path="/resources" element={<Layout><Resources /></Layout>} />
      <Route path="/the-den-live" element={<Layout><TheDenLive /></Layout>} />
      <Route path="/cub-house" element={<Layout><CubHouse /></Layout>} />
      <Route path="/achievements" element={<Layout><ArticlesAchievements /></Layout>} /> 
      <Route path="/events" element={<Layout><Events /></Layout>} /> {/* <-- New Route */}
      <Route path="/:slug" element={<Layout><Page /></Layout>} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
