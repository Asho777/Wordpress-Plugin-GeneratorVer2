import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Preview from './pages/Preview';
import Documentation from './pages/Documentation';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
