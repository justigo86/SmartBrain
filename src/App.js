import React, {useState, useEffect}from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import Clarifai from 'clarifai';

const AppDiv = styled.div `
  text-align:center;
  & > .particles {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
`

const app = new Clarifai.App({
  apiKey: '4460d3f4e3da44c78375c06c03ed2d25'
 });

function App() {
  const [input, setInput] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })
  /*
  useEffect(() => {               //useEffect used to fetch server API
    fetch('http://localhost:3000')  //bridge gap with backend using fetch to fetch server.js APT
    .then(res => res.json())      //convert data to json
    .then(console.log)          //console logging the data from the response (currently shows user info)
  }, [])                        //empty dependencies (for now)
  */

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  // Clarifai.COLOR_MODEL
  // Clarifai.FACE_DETECT_MODEL
  // 'c0c0ac362b03416da06ab3fa36fb58e3'
  // "a403429f2ddf4b49b307e318f00e528b"

  const onButtonSubmit = () => {
    setImgURL(input);      //set image to variable
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)   //look for face within image w.API
    // fetch('http://localhost:3000/imageurl', {
    //   method: 'post',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     input: input
    //   })
    // })
    // .then(response => response.json())
      .then(response => {     //clarifai provides a response
        if (response) {       //if the response is received
          fetch('http://localhost:3000/image', {    //fetch route of image
            method: 'put',                     //ensuring method is PUT
            headers: {'Content-Type': 'application/json'},  //clarifying header info
            body: JSON.stringify({
                id: user.id,
            })   
          })
          .then(response => response.json())
          .then(count => {
            setUser(prevState => ({           //code in course did not work with hooks
                ...prevState, entries: count  //using ...prevState w.spread updates entries immediately
            }))                               //by automatically merging update objects
          })
        }
        displayFaceBox(calculateFaceLocation(response))})
      .catch(err => console.log("error", err));
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <AppDiv className="App">
      <Particles className="particles"
        params={{
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 300
              }
            }
          }
        }}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home' ? 
        <div id='wrap-in-div-to-avoid-error'>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm  onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition box={box} imgURL={imgURL} />
        </div> :
        (route === 'signin' ?
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} /> :
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )
      }
    </AppDiv>
  );
}

export default App;