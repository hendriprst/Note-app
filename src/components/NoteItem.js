import React from "react";
import NoteItemBody from "./NoteItemBody";
import NoteItemCTA from "./NoteItemCTA";

function NoteItem({ title, createdAt, body, id, archived, onDelete, onArchive }) {
  return (
    <article className="note-item">
      <NoteItemBody title={title} createdAt={createdAt} body={body} />
      <NoteItemCTA id={id} onDelete={onDelete} archived={archived} onArchive={onArchive} />
    </article>
  );
}

export default NoteItem;
