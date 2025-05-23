import { Routes, Route } from 'react-router-dom';
import List from './pages/List';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Routes>
      <Route path="/list" element={<List />} />
      <Route path="/" element={<SearchPage />} />
    </Routes>
  );
}

export default App;