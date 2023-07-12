import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {format} from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  
  useEffect(()=>{
    const filteredResults = posts.filter(post=> ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  },[posts, search])

  const handleDelete = (id) =>{
    const postList = posts.filter(post => post.id!== id);
    setPosts(postList);
    navigate('/');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    console.log(dateTime);
    const newPost = { id:id, title: postTitle, datetime:dateTime, body: postBody};
    const allPosts = [...posts, newPost ];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }
  return (
    <div className="App">
      <Header title="React JS Blog" />
        <Nav search={ search } setSearch={ setSearch }/>
        <Routes>
          <Route exact path ="/" element={<Home posts={searchResults}/>} />
          <Route exact path = "/post"
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle ={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            } 
          />
          <Route exact path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="*" element={<Missing />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
