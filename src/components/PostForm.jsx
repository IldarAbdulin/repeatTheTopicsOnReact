import React from 'react';
import { MyInput } from '../UI/MyInput';
import { MyButton } from '../UI/MyButton';

export function PostForm({ create }) {
  const [post, setPost] = React.useState({ title: '', body: '' });

  const onAddPost = (e) => {
    e.preventDefault();
    if (post.title === '' || post.body === '') {
      alert('Строка не может быть пустой');
    } else {
      const newPost = {
        ...post,
        id: Date.now(),
      };
      create(newPost);
      setPost({ title: '', body: '' });
    }
  };
  return (
    <form>
      <MyInput
        type="text"
        placeholder="Название поста"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        placeholder="Описание поста"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <MyButton onClick={onAddPost}>Добавить пост</MyButton>
    </form>
  );
}
