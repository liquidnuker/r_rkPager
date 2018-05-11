import RkPager1 from "./RkPager1.jsx";
import RkPager2 from "./RkPager2.jsx";
import RkPager3 from "./RkPager3.jsx";
import RkPager4 from "./RkPager4.jsx";
import RkPager5 from "./RkPager5.jsx";

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
        <RkPager1 />
        <br />
        <br />
        <RkPager2 />
        <br />
        <br />
        <RkPager3 />
        <br />
        <br />
        <RkPager4 />
        <br />
        <br />
        <RkPager5 />
      </div>
    );
  }
}