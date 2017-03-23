import React, {Component} from 'react';
import { Link } from 'react-router';

import Image from './image';

class App extends Component {
    render() {
        return (
            <div>
              <Image />
              <h1 className="title">Rabiya's Spotify Application</h1>
                {this.props.children}

            </div>
        );
    }
}

export default App;
