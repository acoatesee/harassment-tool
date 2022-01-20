import React from 'react';
import Media from 'react-media';
import './text-over-image.css';

class TextOverImage extends React.PureComponent {
  render () {
    return <div className="container">
            <Media queries={{
              phone: "(max-width: 768px)",
              desktop: "(min-width: 769px)"
            }}>
              {matches => (
                <React.Fragment>
                  {matches.phone && <img src={this.props.imageSrcMobile} style={{width:"100%"}} alt="" />}
                  {matches.desktop && <img src={this.props.imageSrcDesktop} style={{width:"100%"}} alt="" />}
                </React.Fragment>
              )}
            </Media>

            <div className="centered">
              <h2 className="translucent-background-for-text">{this.props.text}</h2>
            </div>
          </div>;
  }
}

export default TextOverImage;
