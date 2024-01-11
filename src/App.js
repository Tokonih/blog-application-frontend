import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Post from './components/Post';
import SinglePost from './pages/SinglePost';
import GetStarted from './pages/GetStarted';
import SignUp from './components/SignUp';
import Write from './pages/Write';
import SignIn from './components/SignIn';
import ProfilePage from './pages/ProfilePage';
import Testing from './components/Testing';
import UserProfile from './pages/UserProfile';
import ProfileContent from './components/ProfileContent';
// import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<GetStarted/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/post/:category/:id' element={<SinglePost/>}/>
        {/* <Route path='/userpost/:userId/post' element={<UserProfile/>}/> */}
        <Route path='/sign' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/write' element={<Testing/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/test' element={<Testing/>}/>
        <Route path='/:userId/post' element={<UserProfile/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
