// App.js
import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    img: '',
    name: '',
    bio: '',
    submitting: false, // for UX feedback
  };

  /* ------------- form handlers ------------- */
  handleSubmit = (event) => {
    event.preventDefault();

    const { img, name, bio } = this.state;

    // simple front-end validation
    if (!img.trim() || !name.trim() || !bio.trim()) {
      alert('Please fill out all fields');
      return;
    }

    this.postApiRequest();
  };

  postApiRequest = async () => {
    this.setState({ submitting: true });

    const url = 'https://apitesting-qcys.onrender.com/api/items';
    const { img, name, bio } = this.state;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ img, name, bio }),
      });

      if (!response.ok) throw new Error('Network error');

      // (optional) you can inspect the JSON if needed
      await response.json();

      // redirect after successful post
      window.location.href = 'https://apitestingsunny.netlify.app/';
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      this.setState({ submitting: false });
    }
  };

  /* ------------- input updaters ------------- */
  handleChange = (field) => (event) => this.setState({ [field]: event.target.value });

  /* ------------- render ------------- */
  render() {
    const { img, name, bio, submitting } = this.state;

    return (
      <div className="app-container">
        <h1 className="form-title">Make An API Request</h1>

        <form className="form-container" onSubmit={this.handleSubmit}>
          <label htmlFor="imgUrl">Image URL</label>
          <input
            id="imgUrl"
            type="text"
            placeholder="Enter image URL"
            value={img}
            onChange={this.handleChange('img')}
          />

          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChange('name')}
          />

          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            type="text"
            placeholder="Enter description"
            value={bio}
            onChange={this.handleChange('bio')}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
    );
  }
}

export default App;
