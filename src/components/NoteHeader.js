import React from "react";

function NoteHeader({ search, onSearchChange }) {
  return (
    <header className="note-app__header">
      <h1>NotesApp</h1>
      <div className="note-search">
        <input
          type="Search"
          placeholder="Search for..."
          value={search}
          onChange={onSearchChange}
        />
      </div>
    </header>
  );
}

export default NoteHeader;
