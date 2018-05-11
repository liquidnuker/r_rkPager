import {tempData} from "../js/pager_tempdata.js";
import Pager from "../js/pager.js";
import {pageBtns} from "../js/pagebtns.js";

class RkPager2_itemsPerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    // binders
    this.handleChange = this.handleChange.bind(this);
    
  }
  // hooks
  
  // methods
  handleChange(event) {
    this.props.pr_val_setPerPage(event.target.value);
  }
  
  render() {
    return (
      <aside className="jspager2_perpageholder">
      <label for="jspager2_perpage">perPage:&nbsp;</label>
      <select name="jspager2_perpage" className="jspager2_perpage" 
      tabindex="0" onChange={this.handleChange} 
      value={this.props.pr_perPage}>
      {this.props.pr_perPageItems.map((i) =>
        <option key={i} value={i}>{i}
          </option>
          )}
      </select> 
      </aside>
    );
  }
}

class RkPager2_btnFirst extends React.Component {
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
      <button className="btn btn_first" tabindex="0" 
      onClick={() => { this.props.pr_val_showItems(1) }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
      <span>First</span>
      </button>
    );
  }
}

class RkPager2_btnPrev extends React.Component {
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
      <button className="btn btn_prev" tabindex="0" 
      onClick={() => { this.props.pr_val_flip() }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
      <span>Prev</span>
      </button>
    );
  }
}

class RkPager2_btnNext extends React.Component {
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
      <button className="btn btn_next" tabindex="0" 
      onClick={() => { this.props.pr_val_flip("next") }}>
      <span>Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
      </button>
    );
  }
}

class RkPager2_btnLast extends React.Component {
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
      <button className="btn btn_last" tabindex="0" 
      onClick={() => { this.props.pr_val_showItems(this.props.pr_totalPages) }}>
      <span>Last</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
      </button>
    );
  }
}



class RkPager2_pageBtnItems extends React.Component {
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
          <a className="jspager2_pagebtn 
          jspager2_pagebtn--active" tabindex="0" 
          onClick={() => { this.props.pr_val_showItems(this.props.pr_i) }}>
            {this.props.pr_i}
          </a>
        );
    } else {
      return (
       <a className="jspager2_pagebtn" tabindex="0" 
       onClick={() => { this.props.pr_val_showItems(this.props.pr_i) }}>
            {this.props.pr_i}
        </a>
      );
    }
  }
}

class RkPager2_pageBtns extends React.Component {
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
      <aside className="jspager2_pagebtnholder" 
      aria-atomic="true" aria-live="polite" 
      aria-relevant="additions">
        {this.props.pr_buttonSet.map((i) =>
          <RkPager2_pageBtnItems 
          pr_i={i}
          pr_currentPage={this.props.pr_currentPage} 
          pr_val_showItems={this.props.pr_val_showItems}/>
        )}
      </aside>
    );
  }
}

class RkPager2_pageSelector extends React.Component {
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
      <aside className="jspager2_totalpagesholder">
      <label for="jspager2_select">Page:</label>
      <p>{this.props.pr_currentPage}</p>
      <select className="jspager2_select" 
      name="jspager2_select" value={this.props.pr_currentPage}
      onChange={this.handleChange} tabindex="0">
      {this.createOptions()}
      </select>
      <p>of {this.props.pr_totalPages}</p>
      </aside>
    );
  }
}

class RkPager2_itemList extends React.Component {
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
      <div className="row jspager2_items" 
      aria-atomic="true" aria-live="assertive" aria-relevant="all">
        {this.props.pr_list.map((i) =>
          <span>{i}</span>
        )}
      </div>
    );
  }
}

export default class RkPager2 extends React.Component {
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
    this.setPerPage = this.setPerPage.bind(this);
    this.flip = this.flip.bind(this);
    
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

  flip(direction) {
    if (direction === "next") {
      this.showItems(this.pg.next());
    } else {
      this.showItems(this.pg.prev());
    }
  }

  setPerPage(perPage) {
    this.state.perPage = perPage;
    this.activatePager();
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
      <div className="jspager2_holder">

      <RkPager2_itemList 
      pr_list={this.state.itemList} />

      <nav className="jspager2">
      <RkPager2_pageSelector
      pr_totalPages={this.state.totalPages} 
      pr_currentPage={this.state.currentPage}
      pr_val_showItems={this.showItems} />

      <aside className="jspager2_prevnextholder">
        <RkPager2_btnFirst 
        pr_val_showItems={this.showItems}/>
        <RkPager2_btnPrev
        pr_val_flip={this.flip} />
        <RkPager2_btnNext
        pr_val_flip={this.flip} />
        <RkPager2_btnLast
        pr_totalPages={this.state.totalPages}
        pr_val_showItems={this.showItems} />
      </aside>

      <RkPager2_pageBtns 
      pr_buttonSet={this.state.buttonSet}
      pr_currentPage={this.state.currentPage}
      pr_val_showItems={this.showItems} />

      <RkPager2_itemsPerPage 
      pr_perPage={this.state.perPage} 
      pr_perPageItems={this.state.perPageItems}
      pr_val_setPerPage={this.setPerPage} />
      </nav>

      </div>
    );
  }
}