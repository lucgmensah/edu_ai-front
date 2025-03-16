import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Training } from './pages/Training';
import { ExerciseView } from './pages/ExerciseView';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { useStore } from './store/useStore';

function App() {
  const user = useStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            user ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/training" element={<Training />} />
          <Route path="/exercise" element={<ExerciseView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;