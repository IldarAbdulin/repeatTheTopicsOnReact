import React from 'react';
import { PostService } from '../API/PostService';
import { PostFilter } from '../components/PostFilter';
import { PostForm } from '../components/PostForm';
import { Posts } from '../components/Posts';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';
import { MyButton } from '../UI/MyButton';
import MyLoader from '../UI/MyLoader';
import MyModal from '../UI/MyModal';
import MyPagination from '../UI/MyPagination';
import { MySelect } from '../UI/MySelect';
import { getPageCount } from '../utils/pages';

export const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [filter, setFilter] = React.useState({ sort: '', query: '' });
  const [modal, setModal] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const lastElement = React.useRef();

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  React.useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const changePage = (page) => {
    setPage(page);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      {postError ? (
        <h1 style={{ textAlign: 'center', color: 'red' }}>
          Произошла ошибка ( ${postError} )
        </h1>
      ) : (
        <>
          <MyButton style={{ margin: '20px 0' }} onClick={() => setModal(true)}>
            Создать пост
          </MyButton>
          <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createNewPost} />
            <hr style={{ margin: '15px 0' }} />
          </MyModal>
          <PostFilter filter={filter} setFilter={setFilter} />
          {postError && (
            <h1 style={{ textAlign: 'center', color: 'red' }}>
              Произошла ошибка ( ${postError} )
            </h1>
          )}
          <MySelect
            value={limit}
            onChange={(value) => setLimit(value)}
            defaultValue="Кол-во элементов на странице"
            options={[
              { value: 5, name: '5' },
              { value: 10, name: '10' },
              { value: 25, name: '25' },
              { value: -1, name: 'Показать всё' },
            ]}
          />
          <Posts
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title="Список постов"
          />
          <div ref={lastElement} style={{ height: 20, background: 'red' }} />
          {isPostLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
              }}
            >
              <MyLoader />
            </div>
          )}

          <MyPagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};
