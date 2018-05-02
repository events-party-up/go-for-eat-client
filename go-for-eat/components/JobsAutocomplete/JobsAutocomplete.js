import React, { Component } from 'react';
import {
  TextInput,
  View,
  Dimensions,
} from 'react-native';

import debounce from 'lodash.debounce';
import s from './styles';

const WINDOW = Dimensions.get('window');

class JobsAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: this.props.profession,
    }
  }

  render() {
    return (
      <View style={s.container} >
        <View style={s.textInputContainer} >
          <TextInput
            ref="textInput"
            returnKeyType={'search'}
            autoFocus={true}
            style={s.textInput}
            value={this.state.profession}
            placeholder='Search...'
            placeholderTextColor='grey'
            // onFocus={''}
            clearButtonMode="while-editing"
            underlineColorAndroid='red'
            // onChangeText={''}
          />
        </View>
      </View>
    );
  }
}

export default JobsAutocomplete;
