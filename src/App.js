import React from 'react';
import './App.css';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Main from './main.jpg'
import Footer from './components/footer/Footer'
import Profile from './components/profile/Profile'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: Main,
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        email: '',
        name: '',
        entries: 0,
        joined: ''
      },
      showProfile: false
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined
    }
    })
  }
  //.region_info.bounding_box
  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    let boxesArray = [];
    let box;
    clarifaiFaces.forEach( clarifaiFace => {
      box = {
        leftCol: clarifaiFace.region_info.bounding_box.left_col * width,
        topRow: clarifaiFace.region_info.bounding_box.top_row * height,
        rightCol: width - (clarifaiFace.region_info.bounding_box.right_col * width),
        bottomRow: height - (clarifaiFace.region_info.bounding_box.bottom_row * height)
      };
      boxesArray.push(box)
    })
    return boxesArray;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes})
  }
  displayProfile = () => {
    this.setState({showProfile: !this.state.showProfile})
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true, imageUrl: Main, boxes: []})
    }
    this.setState({route})
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' ?
          <div>
            <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
            <Profile displayProfile={this.displayProfile} showProfile={this.state.showProfile} name={this.state.user.name} entries={this.state.user.entries} joined={this.state.user.joined}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onPictureSubmit}/>
          </div>
          : (
            route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
        <Footer />
      </div>
    );
  }
}

export default App;
