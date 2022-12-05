import React from "react";
import NoteList from "./NoteList";
import { getInitialData } from "../utils/index";
import NoteInput from "./NoteInput";
import NoteHeader from "./NoteHeader";
import NoteArchived from "./NoteArchived";
import NoteNotFound from "./NoteNotFound";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      query: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        if (note.archived === false) {
          return { ...note, archived: true };
        } else {
          return { ...note, archived: false };
        }
      }
      return note;
    });
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
  }

  onSearchChangeHandler(e) {
    this.setState(() => {
      return {
        query: e.target.value,
      };
    });
  }

  render() {
    const notes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.query.toLowerCase())
    );
    const displayNotes = notes.filter((note) => {
      return note.archived === false;
    });

    const archivedNotes = notes.filter((note) => {
      return note.archived === true;
    });

    return (
      <>
        <NoteHeader
          search={this.state.query}
          onSearchChange={this.onSearchChangeHandler}
        />

        <main className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />

          <h2>Catatan Aktif</h2>
          {displayNotes.length !== 0 ? (
            <NoteList
              notes={displayNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          ) : (
            <NoteNotFound />
          )}

          <h2>Arsip</h2>
          {archivedNotes.length !== 0 ? (
            <NoteArchived
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          ) : (
            <NoteNotFound />
          )}
        </main>
      </>
    );
  }
}

export default NotesApp;
