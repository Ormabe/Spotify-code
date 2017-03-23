import React, {Component} from 'react';

import Image from './image';


class NotFound extends Component {
  render() {
      return (
          <div>
            <Image />
            <h1 className="title">Rabiya's Spotify Application</h1>
              <h1>404</h1>
              <h3>That path does not exist</h3>

          </div>
      );
  }
}

export default NotFound;
