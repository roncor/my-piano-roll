import React, { useState } from 'react';
import MidiInput from './MidiInput';
import PianoRoll from './PianoRoll';
import './App.css';

function App() {
  const [midiData, setMidiData] = useState(null);

  const handleMidiFileLoaded = async (arrayBuffer) => {
    // Parse the MIDI file using the @tonejs/midi library
    import('@tonejs/midi').then(({ Midi }) => {
      const midi = new Midi(arrayBuffer);
      setMidiData(midi);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Implementation of MIDI Piano Roll</h1>
        <h1>for YousicPlay</h1>
        <MidiInput onMidiFileLoaded={handleMidiFileLoaded} />
        <PianoRoll midiData={midiData} />
      </header>
    </div>
  );
}

export default App;
