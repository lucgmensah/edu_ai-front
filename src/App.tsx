import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Training } from './pages/Training';
import { ExerciseView } from './pages/ExerciseView';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useStore } from './store/useStore';
import { SelectTopics } from './pages/SelectTopics';

function App() {
  const setToken = useStore((state) => state.setToken);

  const storedToken = localStorage.getItem('token');
  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            storedToken ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/training" element={<Training />} />
          <Route path="/select-topics" element={<SelectTopics />} />
          <Route path="/exercise" element={<ExerciseView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;