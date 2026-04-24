import { useState } from 'react';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';
import ShadowCasters from './components/ShadowCasters.jsx';

export default function App() {
  const [route, setRoute] = useState('home');
  const [cart] = useState(0);

  if (route === 'details') {
    return <Details onHome={() => setRoute('home')} />;
  }

  if (route === 'shadow-casters') {
    return <ShadowCasters onHome={() => setRoute('home')} />;
  }

  return (
    <Home
      cartCount={cart}
      onOpenProduct={() => setRoute('details')}
      onShadowCasters={() => setRoute('shadow-casters')}
    />
  );
}
