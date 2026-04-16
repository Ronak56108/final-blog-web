import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import CreatePost from './components/CreatePost';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [page, setPage] = useState('home'); 
  const [editPostId, setEditPostId] = useState(null);
  
  const [posts, setPosts] = useState([
    { 
      id: 1,
      title: 'The Beauty of React', 
      category: 'Coding', 
      content: 'Building clean architectures is very satisfying when the components are modular. React allows developers to build large web applications that can change data, without reloading the page.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
      likes: 12,
      comments: [{ id: 101, author: 'Alice', text: 'Totally agree! Components make life easy.' }]
    },
    { 
      id: 2,
      title: 'Mastering Git Workflows', 
      category: 'Coding', 
      content: 'Version control is the lifeblood of software development. Learning how to properly branch, merge, and rebase in git can save you from countless headaches.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1000&auto=format&fit=crop',
      likes: 34,
      comments: []
    },
    { 
      id: 3,
      title: 'Understanding JWT', 
      category: 'Technology', 
      content: 'JSON Web Tokens let us securely transmit data between parties as a JSON object. They are compact, URL-safe, and incredibly useful for authentication scenarios.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
      likes: 8,
      comments: [{ id: 102, author: 'Bob', text: 'This finally clicked for me. Thanks!' }]
    },
    { 
      id: 4,
      title: 'The Rise of AI Agents', 
      category: 'Technology', 
      content: 'Artificial intelligence is shifting from static chat models to dynamic agents capable of reasoning, planning, and executing complex workflows autonomously.',
      image: 'https://picsum.photos/seed/ai/800/400',
      likes: 56,
      comments: []
    },
    { 
      id: 5,
      title: 'Minimalism in Modern Living', 
      category: 'Lifestyle', 
      content: 'Clutter in our physical spaces often leads to clutter in our mental spaces. Adopting a minimalist approach to everyday life can dramatically reduce anxiety and increase focus.',
      image: 'https://picsum.photos/seed/minimal/800/400',
      likes: 21,
      comments: []
    },
    { 
      id: 6,
      title: 'The Art of Slow Coffee', 
      category: 'Lifestyle', 
      content: 'There is something genuinely therapeutic about taking ten minutes every morning to manually grind beans, heat water, and slowly pour-over a fresh cup of coffee.',
      image: 'https://picsum.photos/seed/coffee/800/400',
      likes: 45,
      comments: [{ id: 103, author: 'Sarah', text: 'Pour-over changed my mornings forever.' }]
    },
    { 
      id: 7,
      title: 'Flipping the Classroom', 
      category: 'Education', 
      content: 'Traditional lectures are being moved online, while classroom time is increasingly dedicated to hands-on problem-solving and immediate feedback.',
      image: 'https://picsum.photos/seed/edu/800/400',
      likes: 19,
      comments: []
    },
    { 
      id: 8,
      title: 'Why We Forget What We Read', 
      category: 'Education', 
      content: 'Without proper spaced-repetition and active recall, humans naturally forget roughly 70% of the information they read within 24 hours. Here is how to retain it.',
      image: 'https://picsum.photos/seed/book/800/400',
      likes: 92,
      comments: []
    },
    { 
      id: 9,
      title: 'Exploring Hidden Gems in Europe', 
      category: 'Other', 
      content: 'Beyond the crowded streets of Rome and Paris lie hundreds of medieval villages, pristine alpine lakes, and coastal towns waiting to be discovered by intrepid travelers.',
      image: 'https://picsum.photos/seed/travel/800/400',
      likes: 11,
      comments: []
    },
    { 
      id: 10,
      title: 'A Guide to Indoor Plants', 
      category: 'Other', 
      content: 'Not everyone has a green thumb, but some plants are virtually indestructible. From Snake Plants to Pothos, bringing nature indoors has never been easier.',
      image: 'https://picsum.photos/seed/plant/800/400',
      likes: 27,
      comments: []
    }
  ]);

  const handleLogin = (email, password, name) => {
    const freshUser = { email, name: name || 'User', role: 'user', token: 'user_token_123' };
    localStorage.setItem('user', JSON.stringify(freshUser));
    setUser(freshUser);
    setPage('home');
  };

  const handleAdminLogin = (email, password) => {
    if (email === 'admin@blog.com') {
      const adminUser = { email, role: 'admin', token: 'admin_token_456' };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      setPage('admin');
    } else {
      alert("Invalid admin credentials!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setPage('home');
  };

  const handlePublish = (title, content, category, image) => {
    if (!user) return alert('You need to log in first!');
    
    setPosts([{ id: Date.now(), title, content, category, image, likes: 0, comments: [] }, ...posts]);
    setPage('home');
  };

  const handleUpdate = (id, title, content, category, image) => {
    setPosts(posts.map(post => post.id === id ? { ...post, title, content, category, image } : post));
    setEditPostId(null);
    setPage('home');
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleEdit = (id) => {
    setEditPostId(id);
    setPage('create');
  };

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post));
  };

  const handleAddComment = (postId, text) => {
    const author = user ? user.name : 'Anonymous Reader';
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), { id: Date.now(), author, text }]
        };
      }
      return post;
    }));
  };

  const currentPostToEdit = editPostId ? posts.find(p => p.id === editPostId) : null;

  return (
    <div className="app-container">
      <Navbar user={user} handleLogout={handleLogout} setPage={(p) => { setPage(p); setEditPostId(null); }} />

      <main className="main-content">
        {page === 'login' && <Login handleLogin={handleLogin} setPage={setPage} />}
        {page === 'admin_login' && <AdminLogin handleAdminLogin={handleAdminLogin} setPage={setPage} />}
        {page === 'create' && user && (
          <CreatePost 
            handlePublish={handlePublish} 
            handleUpdate={handleUpdate}
            postToEdit={currentPostToEdit}
          />
        )}
        {page === 'home' && (
          <Home 
            posts={posts} 
            handleLike={handleLike}
            handleAddComment={handleAddComment}
            user={user}
          />
        )}
        {page === 'admin' && user?.role === 'admin' && (
          <AdminPanel 
            posts={posts} 
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
