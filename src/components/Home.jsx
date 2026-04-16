import React, { useState } from 'react';

const CATEGORIES = ['All', 'Technology', 'Lifestyle', 'Education', 'Coding', 'Other'];

function Home({ posts, handleLike, handleAddComment, user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [activeComments, setActiveComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const toggleComments = (postId) => {
    setActiveComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const submitComment = (postId) => {
    const text = commentInputs[postId];
    if (text && text.trim()) {
      handleAddComment(postId, text);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-feed">
      <div className="hero-section">
        <h2>Latest Articles</h2>
        <p>Read the best stories and ideas from our creators.</p>
        
        <div className="search-bar-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search posts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-pills-container">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="posts-container">
        {filteredPosts.length === 0 ? (
          <p className="empty-message">No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              {post.image && (
                <div className="post-image-container">
                  <img src={post.image} alt={post.title} className="post-image" />
                </div>
              )}
              <div className="post-card-header">
                {post.category && <span className="category-badge">{post.category}</span>}
                <h3 className="post-title">{post.title}</h3>
              </div>
              <p className="post-content">{post.content}</p>
              
              <div className="post-footer">
                <div className="post-actions-left">
                  <button className="icon-btn like-btn" onClick={() => handleLike(post.id)}>
                    ❤️ {post.likes || 0} Likes
                  </button>
                  <button className="icon-btn comment-btn" onClick={() => toggleComments(post.id)}>
                    💬 {(post.comments || []).length} Comments
                  </button>
                </div>
                <div className="post-actions-right">
                  <span className="read-more">Read Full Post &rarr;</span>
                </div>
              </div>

              {activeComments[post.id] && (
                <div className="comments-section">
                  <h4>Discussion</h4>
                  <div className="comments-list">
                    {(post.comments || []).map(comment => (
                      <div key={comment.id} className="comment-bubble">
                        <span className="comment-author">{comment.author}</span>
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    ))}
                    {(!post.comments || post.comments.length === 0) && (
                      <p className="no-comments">Be the first to comment!</p>
                    )}
                  </div>
                  
                  <div className="comment-input-area">
                    <input 
                      type="text" 
                      placeholder={user ? "Write a comment..." : "Write a comment (Anonymous)..."}
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}
                    />
                    <button onClick={() => submitComment(post.id)} className="primary-btn small-btn">Post</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
