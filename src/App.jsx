import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Page from './pages/Page';
import About from './pages/About';
import Issues from './pages/Issues';
import Endorsements from './pages/Endorsements';
import Volunteer from './pages/Volunteer';
// New Pages
import BearNecessities from './pages/BearNecessities';
import Resources from './pages/Resources';
import TheDenLive from './pages/TheDenLive';
import CubHouse from './pages/CubHouse';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/issues" element={<Layout><Issues /></Layout>} />
      <Route path="/endorsements" element={<Layout><Endorsements /></Layout>} />
      <Route path="/volunteer" element={<Layout><Volunteer /></Layout>} />
      {/* New links */}
      <Route path="/bear-necessities" element={<Layout><BearNecessities /></Layout>} />
      <Route path="/resources" element={<Layout><Resources /></Layout>} />
      <Route path="/the-den-live" element={<Layout><TheDenLive /></Layout>} />
      <Route path="/cub-house" element={<Layout><CubHouse /></Layout>} />
      <Route path="/:slug" element={<Layout><Page /></Layout>} />
    </Routes>
  );
}

export default App;
