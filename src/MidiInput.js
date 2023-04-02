import React, { useRef } from 'react';

const MidiInput = ({ onMidiFileLoaded }) => {
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    onMidiFileLoaded(arrayBuffer);
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept=".midi, .mid"
      />
    </div>
  );
};

export default MidiInput;