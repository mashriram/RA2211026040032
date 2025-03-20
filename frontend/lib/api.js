// frontend/lib/api.js (Helper functions for API calls)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // get the url

async function fetcher(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };

  const res = await fetch(`${API_URL}${url}`, options);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function getPosts() {
  return fetcher('/posts');
}
export async function getPost(id) {
    return fetcher(`/posts/${id}`);
}

export async function createPost(postData) {
  return fetcher('/posts', 'POST', postData);
}

export async function updatePost(id, postData) {
  return fetcher(`/posts/${id}`, 'PUT', postData);
}

export async function deletePost(id) {
  return fetcher(`/posts/${id}`, 'DELETE');
}

export async function getUsers() {
  return fetcher('/users');
}
export async function getUser(id) {
    return fetcher(`/users/${id}`)
}

export async function createUser(userData){
    return fetcher('/users', 'POST', userData)
}

export async function updateUser(id, userData){
    return fetcher(`/users/${id}`, 'PUT', userData)
}
export async function deleteUser(id){
    return fetcher(`/users/${id}`, 'DELETE')
}