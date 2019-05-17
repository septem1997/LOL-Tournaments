import styles from './index.css';
import { Carousel } from 'antd-mobile';
import React from 'react';
import axios from 'axios';

export default class extends React.Component {

  state = {
    banner: [],
  };

  async componentDidMount() {
    let res = await axios({
      method: 'post',
      data: {
        api_path: '/services/cms/article_list.php',
        channel_id: 7,
        page: 1,
      },
    });
    this.setState({
      banner:res.article_list.splice(0,10)
    })

  }


  render() {
    return (
      <div >
        <Carousel
          autoplay
          infinite
        >
          {this.state.banner.map(val => (
            <div style={{width:'100%',height:'33.33vh'}}>
              <img
                src={val.picture_list[0]}
                alt=""
                style={{ height: '100%',width:'auto', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }


}
