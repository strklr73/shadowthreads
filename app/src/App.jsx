import { useState } from 'react';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';

export default function App() {
  const [route, setRoute] = useState('home');
  const [cart] = useState(0);

  if (route === 'details') {
    return <Details onHome={() => setRoute('home')} />;
  }

  return (
    <Home
      cartCount={cart}
      onOpenProduct={() => setRoute('details')}
    />
  );
}
