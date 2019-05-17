import styles from './index.css';
import { Carousel } from 'antd-mobile';
import React from 'react';
import axios from 'axios';
import MyScroll from '@/components/MyScroll';
import moment from 'moment';

export default class extends React.Component {

  state = {
    banner: [],
    list:[]
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
    let match = await axios({
      method: 'post',
      data:{
        api_path:'services/match/web_math_list.php'
      }
    })
    let list = []
    for(let key in match.list){
      list.push({
        date:key,
        ...match.list[key]
      })
    }
    console.log(list)
    this.setState({
      banner: res.article_list.splice(0, 10),
      list:list
    });

  }


  render() {
    return (
      <div>
        <MyScroll className={styles.wrapper} data={this.state.list}>
          <Carousel
            autoplay={false}
            infinite
          >
            {this.state.banner.map(val => (
              <div style={{ width: '100%', height: '33.33vh' }}>
                <img
                  src={val.picture_list[0]}
                  alt=""
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Carousel>


          {this.state.list.map(item =>(
            <div className={styles.card}>
              <div>
                <span>{moment(item.date).format("MM.DD")}</span>
                <span>周{moment(item.date).format("dd")}</span>
              </div>
            </div>
          ))}
        </MyScroll>
      </div>
    );
  }


}
