import React, { useState } from 'react';

function AdminPanel({ posts, handleDelete, handleEdit }) {
  const [searchTerm, setSearchTerm] = useState('');

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage all your publications and monitor performance.</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p className="stat-value">{totalPosts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Likes Received</h3>
          <p className="stat-value">❤️ {totalLikes}</p>
        </div>
      </div>

      <div className="admin-content glass-panel">
        <div className="table-header-controls">
          <h3>All Articles</h3>
          <input 
            type="text" 
            className="search-input admin-search" 
            placeholder="Search by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Likes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-message">No posts found.</td>
                </tr>
              ) : (
                filteredPosts.map(post => (
                  <tr key={post.id}>
                    <td className="post-title-col"><strong>{post.title}</strong></td>
                    <td><span className="category-badge">{post.category}</span></td>
                    <td>{post.likes || 0}</td>
                    <td>
                      <div className="action-buttons-cell">
                        <button className="icon-btn edit-btn" onClick={() => handleEdit(post.id)}>Edit</button>
                        <button className="icon-btn delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
