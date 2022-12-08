import React from 'react';
import { PostFilter } from './components/PostFilter';
import { PostForm } from './components/PostForm';
import { Posts } from './components/Posts';
import { MyButton } from './UI/MyButton';
import MyModal from './UI/MyModal';

export function App() {
  const [posts, setPosts] = React.useState([
    { id: 1, title: 'аа', body: 'гг' },
    { id: 2, title: 'гг 2', body: 'аа' },
  ]);
  const [filter, setFilter] = React.useState({ sort: '', query: '' });
  const [modal, setModal] = React.useState(false);

  const sortedPost = React.useMemo(() => {
    console.log('Отработал сортед пост');
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = React.useMemo(() => {
    return sortedPost.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPost]);

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div className="App">
      <MyButton style={{ margin: '20px 0' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createNewPost} />
        <hr style={{ margin: '15px 0' }} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <Posts
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список постов"
      />
    </div>
  );
}
