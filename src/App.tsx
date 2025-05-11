import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryDirectory from './pages/CategoryDirectory';
import EnterpriseDetail from './pages/EnterpriseDetail';
import AddEnterprise from './pages/AddEnterprise';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/directory/:categorySlug" element={<CategoryDirectory />} />
          <Route path="/enterprise/:id" element={<EnterpriseDetail />} />
          <Route path="/add-enterprise" element={<AddEnterprise />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;