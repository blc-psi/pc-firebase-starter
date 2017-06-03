
/** TODO Remove dep, that are not needed anymore **/
import React from 'react';
import styles from "../style.css";
import {Bond} from 'oo7';
import {RRaisedButton, Rspan, TextBond, HashBond} from 'oo7-react';
import {bonds,formatBlockNumber, formatBalance, isNullData, makeContract} from 'oo7-parity';
import {TransactionProgressBadge, AccountIcon} from 'parity-reactive-ui';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as firebase from 'firebase';
import {sha3_256} from 'js-sha3';
import FileUploader from 'react-firebase-file-uploader';
import {FireClass} from './fireclass.jsx';
import {ABI} from './ABI.jsx';

//creats new instant of FireClass, which handles all Firebase Stuff => see fireclass.jsx
const fc = new FireClass();
//loads Class of ABI's
const abi = new ABI();

export class App extends React.Component {
  constructor() {
    super();
    //has to be updated to new contract
    this.contract = parity.bonds.makeContract('0x0AD24CEab0555599429ec755c8492Ae9B2c2Fe94', abi.getTestimonyABI());
    //remove, just here for reference how it is working
    this.tests = this.contract.savedTestimony();
    this.state = {
      tx: null,
      //link to image in firebase storage
      url: '',
      //parameter of Pass
      Test: '',
      liebe: ''
      };
  }
  //lifeCycle of the Component, called once it is rendered to the DOM
  //reading from the firebaseDB
  //move to FireClass?
  componentDidMount() {
    const passRef = firebase.database().ref('/pass/' + '0x008aB18490E729bBea993817E0c2B3c19c877115');
    //once value changes, the DOM gets updated

    passRef.on('value', snap => {
      var pass = snap.val();
      this.setState({
        Test: pass.Test,
        liebe: pass.liebe
      });
    });
  }


  render() {
    return (
      <div>
      <h1>{this.state.speed}</h1>
      <h1>{this.state.Test}</h1>

      <FileUploader
            accept="image/*"
            name="avatar"
            filename= {fc.getAddress()}
            storageRef={firebase.storage().ref()}
            onUploadStart={fc.handleUploadStart}
            onUploadError={fc.handleUploadError}
            onUploadSuccess={fc.handleUploadSuccess.bind(this)}
            onProgress={fc.handleProgress}
          />
       <img src={this.state.url} />
      </div>
    );
  }
}
