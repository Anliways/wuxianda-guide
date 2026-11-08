import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { AppLayout } from '@/components/layouts/AppLayout';

import { routes } from './routes';

const App = () => {
  return (
    <Router>
      <IntersectObserver />
      <AppLayout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </AppLayout>
      <Toaster />
    </Router>
  );
};

export default App;
