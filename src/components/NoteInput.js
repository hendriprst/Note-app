import React from "react";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      maxChar: 50
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeHandler(e) {
    if (this.state.maxChar > 0) {
      this.setState((s) => {
        return {
          title: e.target.value,
          maxChar: s.maxChar - 1
        }
      });
    }
  }

  onBodyChangeHandler(e) {
    this.setState(() => {
      return {
        body: e.target.value,
      };
    });
  }

  onSubmitEventHandler(e) {
    e.preventDefault();
    this.props.addNote(this.state);
    this.setState(() => {
      return {
        title: "",
        body: "",
        maxChar: 50
      }
    });
  }

  render() {
    return (
      <section className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="note-input__title__char-limit">
            Sisa Karakter: {this.state.maxChar}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onTitleChangeHandler}
            required
          />
          <textarea
            className="note-input__body"
            type="text"
            placeholder="Description"
            value={this.state.body}
            onChange={this.onBodyChangeHandler}
            required
          ></textarea>
          <button type="submit">Create a Note</button>
        </form>
      </section>
    );
  }
}

export default NoteInput;
