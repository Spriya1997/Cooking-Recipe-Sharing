import React from "react";

class StarChooser extends React.Component {
    getActiveStar = value => {
      return (this.props.stars >= value) ? " active" : "";
    }
  
    setStar = value => {
      this.props._onSubmit(value);
    }
  
    render() {
      return(
        <div>
          <div id="starfield">
            <div
              className={ `star ${this.getActiveStar(1)}` }
              onClick={ () => this.setStar(1) }
              >
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div
              className={ `star ${this.getActiveStar(2)}` }
              onClick={ () => this.setStar(2) }
              >
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div
              className={ `star ${this.getActiveStar(3)}` }
              onClick={ () => this.setStar(3) }
              >
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div
              className={ `star ${this.getActiveStar(4)}` }
              onClick={ () => this.setStar(4) }
              >
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div
              className={ `star ${this.getActiveStar(5)}` }
              onClick={ () => this.setStar(5) }
              >
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      );
    }
  }
  
export default StarChooser;
  