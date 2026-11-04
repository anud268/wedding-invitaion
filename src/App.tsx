import { useState } from 'react';
import Cover from './components/Cover';
import Invitation from './components/Invitation';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-frame">
      {isOpen ? (
        <>
          <Invitation />
          <MusicPlayer />
        </>
      ) : (
        <Cover onOpen={() => setIsOpen(true)} />
      )}
    </div>
  );
}

export default App;
