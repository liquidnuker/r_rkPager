import {tempData} from "../js/pager_tempdata.js";

class RkPager1_itemList extends React.Component {
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
        {this.props.pr_list.map((i) =>
          <span>{i}</span>
        )}
      </div>
    );
  }
}

class RkPager1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    };

    // binders
    
  }
  // hooks
  componentDidMount() {
    this.setItems();
  }

  // methods
  setItems() {    
    this.setState({
      itemList: tempData
    }); 
  }
  
  render() {
    return (
      <div>
        <RkPager1_itemList 
        pr_list={this.state.itemList} />
      </div>
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