import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import LoadingScreen from './components/LoadingScreen';


function App() {
  return (
    <Router>
      <LoadingScreen>
        <AppRoutes />
      </LoadingScreen>
    </Router>
  );
}

export default App;
