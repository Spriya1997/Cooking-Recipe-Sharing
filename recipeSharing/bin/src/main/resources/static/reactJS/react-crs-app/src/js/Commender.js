import React from "react";

class Commender extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        message: ""
      }
    }
  
    componentWillReceiveProps(newProps) {
      let a = {
        1: "Oh. Sorry you had a bad experience :(",
        2: "We will try to improve.",
        3: "Appreciate it!",
        4: "Thank you! :0",
        5: "You're Awesome! :)"
      },
      b = newProps.rate;
  
      this.setState({
        rating: b,
        message: a[b]
      });
    }
  
    render() {
      if(this.props.rate !== 0 && this.state.message.length) {
        return(
          <div id="commender">
            <p className="commender_tit">
              You rated this { `${this.props.rate} ${(this.props.rate > 1) ? "stars" : "star"}` }
            </p>
            <p className="commender_tit">{ this.state.message }</p>
          </div>
        );
      } else {
        return null;
      }
    }
  }

  
export default Commender;