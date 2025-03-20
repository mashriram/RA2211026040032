// frontend/pages/index.js (updated with PostForm)
import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import { getPosts, createPost } from '../lib/api';

function HomePage() {
  const [posts, setPosts] = useState([]);

  const refreshPosts = async () => { //refresh the page after POST,PUT,DELETE
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const handlePostCreated = async (newPostData) => {
    try {
      await createPost(newPostData);
      refreshPosts(); // Fetch posts again after creating
    } catch (error) {
      console.error("Failed to create post:", error);
      // Display error message to the user (e.g., using a toast or alert)
    }
  };

  return (
    <div>
      <h1>Social Media Feed</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <PostList posts={posts} onPostUpdated={refreshPosts} onPostDeleted={refreshPosts}/>
    </div>
  );
}

export default HomePage;