import {tempData} from "../js/pager_tempdata.js";
import Pager from "../js/pager.js";
import {pageBtns} from "../js/pagebtns.js";

class RkPager1_pageSelector extends React.Component {
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
        Page {this.props.pr_currentPage} of {this.props.pr_totalPages}
      </div>
    );
  }
}

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
    
    this.items = []; // raw items
    this.pg = null;
    
    this.state = {
      itemList: [], // paginated items

      perPage: 10,
      perPageItems: [10, 20, 50, 100],
      totalPages: "",
      currentPage: "",
    };

    // binders
    
  }
  // hooks
  componentDidMount() {
    this.items = tempData;
    this.activatePager();
  }

  // methods
  activatePager() {    
    this.pg = null;
    this.pg = new Pager({
      perPage: this.state.perPage,
      data: this.items
    });

    this.setState(prevState => ({
       totalPages: this.pg.getTotalPages()
     })); 

     // this.setPageBtns();
     this.showItems(1);        
  }

  showItems(num) {
    this.setState(prevState => ({
      itemList: this.pg.page(num),
      currentPage: this.pg.currentPage
    }));

    // this.changePageBtns();
  }
  
  render() {
    return (
      <div>
        <RkPager1_itemList 
        pr_list={this.state.itemList} />

        <RkPager1_pageSelector
        pr_totalPages={this.state.totalPages} 
        pr_currentPage={this.state.currentPage} />
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