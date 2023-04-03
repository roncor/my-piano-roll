import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

const NoteLabel = ({ midiNumber, isActive, isAccidental }) => {
  return (
    <div
      style={{
        display: 'none',
      }}
    />
  );
};

const PianoRoll = ({ midiData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);
  const [parts, setParts] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const pianoRef = useRef();

  const firstNote = MidiNumbers.fromNote('A0');
  const lastNote = MidiNumbers.fromNote('C8');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote,
    lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  useEffect(() => {
    if (!midiData || !isPlaying) return;

    const newSynth = new Tone.PolySynth().toDestination();
    setSynth(newSynth);

    const newParts = midiData.tracks.map((track) => {
      const trackNotes = track.notes.map((note) => ({
        time: note.time,
        note: Tone.Frequency(note.midi, 'midi').toNote(),
        midi: note.midi,
        duration: note.duration,
        velocity: note.velocity,
      }));

      const part = new Tone.Part((time, value) => {
        newSynth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
        setActiveNotes((prevActiveNotes) => [...prevActiveNotes, value.midi]);

        Tone.Draw.schedule(() => {
          setActiveNotes((prevActiveNotes) => prevActiveNotes.filter((midi) => midi !== value.midi));
        }, time + value.duration);
      }, trackNotes);

      part.start();
      return part;
    });

    setParts(newParts);

    Tone.Transport.start();

    const stopPlayback = () => {
      setIsPlaying(false);
      Tone.Transport.stop();
      newParts.forEach((part) => part.dispose());
    };

    return stopPlayback;
  }, [midiData, isPlaying]);

  if (!midiData) {
    return <div>No MIDI data loaded</div>;
  }

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleStopClick = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <h2>Piano Roll</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handlePlayClick} disabled={isPlaying} style={{ marginRight: '10px' }}>
          Play
        </button>
        <button onClick={handleStopClick} disabled={!isPlaying} style={{ marginLeft: '10px' }}>
          Stop
        </button>
      </div>
      <Piano
        ref={pianoRef}
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {}}
        stopNote={(midiNumber) => {}}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
        activeNotes={activeNotes}
        renderNoteLabel={(midiNumber, isActive, isAccidental) => (
          <NoteLabel midiNumber={midiNumber} isActive={isActive} isAccidental={isAccidental} />
        )}
      />
    </div>
  );
};

export default PianoRoll;
