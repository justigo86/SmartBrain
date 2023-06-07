import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import styled from "styled-components";
// import Clarifai from "clarifai";

// const clarifaiRequest = (imgURL) => {
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   const PAT = "dfc62ad7090f4c5db9a89d0ff756090a";
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = "justigo86";
//   const APP_ID = "Face_Detection_API";
//   // Change these to whatever model and image URL you want to use
//   // const MODEL_ID = 'face-detection';
//   const IMAGE_URL = imgURL;

//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//           },
//         },
//       },
//     ],
//   });

//   return {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Key " + PAT,
//     },
//     body: raw,
//   };
// };

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

const AppDiv = styled.div`
  text-align: center;
  & > .particles {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
`;

// const app = new Clarifai.App({
//   apiKey: "",
// }); //API key is vulnerability and needs to be moved to back-end for security

function App() {
  const [input, setInput] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const initialState = () => {
    setInput("");
    setImgURL("");
    setBox({});
    setRoute("signin");
    setIsSignedIn(false);
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    });
  };

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
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = image.width;
    const height = image.height;
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  // Clarifai.COLOR_MODEL
  // Clarifai.FACE_DETECT_MODEL
  // 'c0c0ac362b03416da06ab3fa36fb58e3'
  // "a403429f2ddf4b49b307e318f00e528b"

  const onButtonSubmit = () => {
    setImgURL(input); //set image to variable
    // app.models
    //   .predict(Clarifai.FACE_DETECT_MODEL, input) //look for face within image w.API
    // fetch('http://localhost:3000/imageurl', {
    //   method: 'post',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     input: this.state.input
    //   })
    // })
    // .then(response => response.json())
    //fetch using clarifai image outputs
    // fetch(
    //   "https://api.clarifai.com/v2/models/face-detection/outputs",
    //   clarifaiRequest(input)
    // )
    // .then((response) => response.json())
    //fetch added after moving API key to backend (image.js)
    // fetch('https://floating-waters-88143.herokuapp.com/imageurl', {
    fetch("https://smartbrain-api-xi9j.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json()) //fetched data needs to be converted into JSON
      .then((response) => {
        //clarifai provides a response
        if (response) {
          //if the response is received
          // fetch("http://localhost:3000/image", {
          // fetch('https://floating-waters-88143.herokuapp.com/image', {    //fetch route of image
          fetch("https://smartbrain-api-xi9j.onrender.com/image", {
            method: "put", //ensuring method is PUT
            headers: { "Content-Type": "application/json" }, //clarifying header info
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevState) => ({
                //code in course did not work with hooks
                ...prevState,
                entries: count, //using ...prevState w.spread updates entries immediately
              })); //by automatically merging update objects
            })
            .catch((err) => console.log("error", err));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log("error", err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      // setIsSignedIn(false);
      initialState();
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <AppDiv className="App">
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 300,
              },
            },
          },
        }}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div id="wrap-in-div-to-avoid-error">
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imgURL={imgURL} />
        </div>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </AppDiv>
  );
}

export default App;
