import React, { useState, useEffect } from 'react';

function CreatePost({ handlePublish, handleUpdate, postToEdit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setCategory(postToEdit.category || 'Technology');
      setImage(postToEdit.image || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('Technology');
      setImage('');
    }
  }, [postToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (title && content && category) {
      if (postToEdit) {
        handleUpdate(postToEdit.id, title, content, category, image);
      } else {
        handlePublish(title, content, category, image);
      }
      if (!postToEdit) {
        setTitle('');
        setContent('');
        setCategory('Technology');
        setImage('');
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="center-container">
      <form className="auth-card glass-panel publish-card" onSubmit={submit}>
        <div className="card-header">
          <h2>{postToEdit ? 'Edit Article' : 'Write a New Article'}</h2>
          <p>{postToEdit ? 'Update your ideas' : 'Share your ideas with the community'}</p>
        </div>
        
        <div className="input-group">
          <label>Article Title</label>
          <input 
            type="text" 
            placeholder="e.g., My Journey into Web Development" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Coding">Coding</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Cover Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            style={{ padding: '10px' }}
          />
          {image && (
            <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', height: '120px' }}>
              <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <div className="input-group">
          <label>Article Content</label>
          <textarea 
            placeholder="What's on your mind today?" 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="primary-btn full-width">
          {postToEdit ? 'Update Post' : 'Publish Now'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
