import Video from '../../src/App';
import {AppRegistry} from 'react-native';
import '../../src/assets/font-styles.css';
// import React from 'react';

// const Video = () => <div>Hello </div>;

AppRegistry.registerComponent('App', () => Video);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app'),
});
