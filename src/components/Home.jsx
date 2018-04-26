import {tempData} from "../js/pager_tempdata.js";
import Pager from "../js/pager.js";
import {pageBtns} from "../js/pagebtns.js";

class RkPager1_buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    // binders
    
  }
  // hooks
  
  // methods
  
  render() {
    if (this.props.pr_i === this.props.pr_currentPage) {
      return (
          <a className="jspager1_pagebtn 
          jspager1_pagebtn--active" tabindex="0" 
          onClick={() => { this.props.pr_val_showItems(this.props.pr_i) }}>
            {this.props.pr_i}
          </a>
        );
    } else {
      return (
       <a className="jspager1_pagebtn" tabindex="0" 
       onClick={() => { this.props.pr_val_showItems(this.props.pr_i) }}>
            {this.props.pr_i}
        </a>
      );
    }
  }
}




class RkPager1_pageButtons extends React.Component {
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
      <div className="jspager1">
        {this.props.pr_buttonSet.map((i) =>
          <RkPager1_buttons 
          pr_i={i}
          pr_currentPage={this.props.pr_currentPage} 
          pr_val_showItems={this.props.pr_val_showItems}/>
        )}
      </div>
    );
  }
}

class RkPager1_pageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    // binders
    this.handleChange = this.handleChange.bind(this);
    
  }
  // hooks
  
  // methods
  createOptions() {
    let items = [];         
    for (let i = 1; i <= this.props.pr_totalPages; i++) {             
      items.push(<option onClick={() => 
        {this.props.pr_val_showItems(i)}} key={i} value={i}>{i}</option>);   
    }
    return items;
  }   

  handleChange(event) {
    this.props.pr_val_showItems(event.target.value);
  } 
  
  render() {
    return (
      <div>
      Page
      <select className="" value={this.props.pr_currentPage}
      onChange={this.handleChange} >
      {this.createOptions()}
      </select>
      of {this.props.pr_totalPages}
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

      buttonSet: [],
    };

    // binders
    this.showItems = this.showItems.bind(this);
    
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

     this.setPageBtns();
     this.showItems(1);        
  }

  showItems(num) {
    this.setState(prevState => ({
      itemList: this.pg.page(num),
      currentPage: this.pg.currentPage
    }));

    this.changePageBtns();
  }

  setPageBtns() {
    this.temp = [];
    for (let i = 0, l = this.pg.getTotalPages(); i < l; i++) {
      this.temp.push(pageBtns(i, l));
    }
  }

  changePageBtns() {
    this.setState(prevState => ({
      buttonSet: this.temp[this.pg.currentPage - 1]
    }));
  }
  
  render() {
    return (
      <div>
        <RkPager1_itemList 
        pr_list={this.state.itemList} />

        <RkPager1_pageSelector
        pr_totalPages={this.state.totalPages} 
        pr_currentPage={this.state.currentPage}
        pr_val_showItems={this.showItems} />

        <RkPager1_pageButtons 
        pr_buttonSet={this.state.buttonSet}
        pr_currentPage={this.state.currentPage}
        pr_val_showItems={this.showItems} />
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