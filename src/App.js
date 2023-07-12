import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import About from './components/About';
import Missing from './components/Missing';
import { Route, Routes} from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  useEffect( () => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Routes>
        <Route exact path ="/" element={<Home isLoading ={isLoading} fetchError = {fetchError} />} />
        <Route exact path = "/post" element={<NewPost />} />
        <Route exact path = "/edit/:id" element={<EditPost />} />
        <Route exact path="/post/:id" element={<PostPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
