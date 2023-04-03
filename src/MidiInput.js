import React from 'react';

const MidiInput = ({ onMidiFileLoaded }) => {
  const handleFileSelected = async (event) => {
    const file = event.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    onMidiFileLoaded(arrayBuffer, file.name);
  };

  return (
    <div>
      <label htmlFor="midi-file-input">
        Load MIDI File
        <input
          type="file"
          id="midi-file-input"
          accept=".mid,.midi"
          onChange={handleFileSelected}
        />
      </label>
    </div>
  );
};

export default MidiInput;
