import React, { useState } from 'react';
import MidiInput from './MidiInput';
import PianoRoll from './PianoRoll';
import './App.css';

function App() {
  const [midiData, setMidiData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleMidiFileLoaded = async (arrayBuffer, name) => {
    // Parse the MIDI file using the @tonejs/midi library
    import('@tonejs/midi').then(({ Midi }) => {
      const midi = new Midi(arrayBuffer);
      setMidiData(midi);
      setFileName(name);
    });
  };

  const handleCleanClick = () => {
    setMidiData(null);
    setFileName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Implementation of MIDI Piano Roll</h1>
        <h1>for YousicPlay</h1>
        {midiData ? (
          <>
            <div className="file-info">
              <label>File name:</label>
              <p>{fileName}</p>
            </div>
            <div className="button-group">
              <button className="clean" onClick={handleCleanClick}>
                Clean
              </button>
              <PianoRoll midiData={midiData} />
            </div>
          </>
        ) : (
          <MidiInput onMidiFileLoaded={handleMidiFileLoaded} />
        )}
      </header>
    </div>
  );
}

export default App;
