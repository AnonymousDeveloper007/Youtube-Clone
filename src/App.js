import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Grid} from '@material-ui/core';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';


/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

class App extends React.Component
{
  state = {
    videos:[],
    selectedVideo:null
  }

  onVideoSelect = (video) =>{
        this.setState({selectedVideo:video});
  }
  handleSubmit = async (searchTerm) =>
  {
    const response = await youtube.get('search' , { params:{
      part:'snippet',
      maxResults: 7,
      key:'AIzaSyCDRXboyzylpR7ZRWI94Rr51wpUa5WNYlw',
      q:searchTerm,
    }});
    console.log(response.data.items);
    this.setState({videos:response.data.items,selectedVideo:response.data.items[0]})
  }
  render()
  {
    const {selectedVideo,videos} = this.state;
    return(
      
      <Grid justify="center" container spacing={12}>
        <Grid item xs={12}>
          <Grid container  spacing={12}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit = {this.handleSubmit}/>
            </Grid>
            <Grid item width='50%' xs={8}>
             <VideoDetail video={selectedVideo}/>
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default App;
