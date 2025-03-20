// frontend/components/PostList.js (updated with edit/delete)
import Link from 'next/link';

function PostList({ posts, onPostUpdated, onPostDeleted }) {
    if (!posts || posts.length === 0) {
    return <div>No posts yet.</div>;
    }
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
                <p>{post.content}</p>
            </Link>
          <p>By: {post.user.username}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;