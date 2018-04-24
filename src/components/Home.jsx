import {tempData} from "../js/pager_tempdata.js";

class RkPager1 extends React.Component {
  constructor(props) {
    super(props);
    this.items = []; // raw items
    this.state = {
      itemList: []
    };

    // binders
    
  }
  // hooks
  componentDidMount() {
    this.items = tempData;
    this.setItems();
  }

  componentDidUpdate() {
        
  }

  // methods
  setItems() {    
    this.setState({
      itemList: this.items
    }); 
  }
  
  render() {
    return (
      <div>{this.state.itemList}</div>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

    // binders
  }
  // hooks
   
  // methods
    
  render() {
    return (
      <div>
        <RkPager1  />
      </div>
    );
  }
}