import React, {Component, Fragment} from 'react';

class HomePageDetail extends Component{
  render() {
    return (
      <Fragment>
      <body>
      <p>Welcome to PinBall Wizard!</p>
      <p>Can you play a mean pinball?</p>
      <p>Controls: </p>
      <ul>
      <li>Launch Ball: Space Bar</li>
      <li>Left Flipper: Left Arrow Key</li>
      <li>Right Flipper: Right Arrow Key</li>
      </ul>
      </body>
      </Fragment>
    );
  }
}

export default HomePageDetail;
