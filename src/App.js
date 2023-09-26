import { Component } from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import ParticleSettings from './component/ParticleSettings';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Resister/Resister';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '7abaa6958cad4b36bfe00ae8068ecf78';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'foomin';
  const APP_ID = 'my-application-1';
  const MODEL_ID = "face-detection";
  // Change these to whatever model and image URL you want to use    
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
  };

  return {requestOptions : requestOptions,
          MODEL_ID: MODEL_ID
         };
};

const initialState = {
  input: '',
  imageUrl: '',
  boxs: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  
  constructor() {
    super();
    this.state = initialState;
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  caluculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(data);
    const clarifaiFaces = data.outputs[0].data.regions.map((region) => {
      return{
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - (region.region_info.bounding_box.right_col * width),
        bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
       }
    });
    // region.region_info.bounding_box;

     return clarifaiFaces;
  };

  displayFaceBox = (boxs) => {
    console.log(boxs);
    this.setState({boxs: boxs});
    console.log('box',this.state.boxs);
    return this.state.boxs;
  };

  onInputChange = (event) => { //入力の変化がトリガー
    this.setState({input: event.target.value});
  };

  onPictureSubmit = async () => { //ボタンがトリガー
    await this.setState({imageUrl: this.state.input});
    // stateのimgUrlにinputが入るのを待ってから
    const {requestOptions, MODEL_ID } = returnClarifaiRequestOptions(this.state.imageUrl); //デストラクト
    console.log(requestOptions, MODEL_ID);
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response) // Handle error responses HTTP 4XX, 5XX
      } else {
        return response.json() // Return success response HTTP 2XX, 3XX
      }
    })
    .then((response) => {  //上の処理がなかったらfetchエラーでも実行されてしまう
      console.log(response);
      const boxnum = response.outputs[0].data.regions.length;
      if (response) {
        fetch('http://localhost:3000/image', 
        {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
                id: this.state.user.id,
                boxnum: boxnum
                })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log);

      this.displayFaceBox(this.caluculateFaceLocation(response))
    }})
    .catch(error => console.log('error', error));
  };

  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({route: route});
  };

  render() {
    const { isSignedIn, imageUrl, route, boxs, user } = this.state;

    return (
      <div className="App">
        <ParticleSettings />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onPictureSubmit} />
            <FaceRecognition boxs={boxs} imageUrl={imageUrl}/>
          </div>
          : (route === 'signin' 
             ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
             : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
             )
        }
      </div>
    );
  }
}

export default App;
