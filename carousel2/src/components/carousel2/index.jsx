import React,{useEffect,useRef} from "react";
import css from "./styles/index.module.css";
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';
import './styles/global.css'
export default function (props) {
  const { left, top, width, height, id, data, configuration: { series, max } } = props;
  const mySwiperRef = useRef(null);
  // 自定义逻辑
  const styles = {
    position: "absolute",
    left,
    top,
    width,
    height,
    textAlign: "center",
  };
  // 把configuration.series obj转换为数组
  const pages = JSON.parse(JSON.stringify(Object.keys(series).map(v => series[v])))
    //截取关键字拼接HTML
  pages.forEach(i => {
        //i 一个卡片
        const text = i.content;
        const keywords = i.keyCode.split(',');
        // 将不同关键字拼接成正则表达式
        const regex = new RegExp(keywords.join("|"), "g");
        // 使用正则表达式进行文本匹配
        const matches = text.match(regex) || [];
        // 将关键字和非关键字分别存放在不同的元素中
        const result = text.split(regex).flatMap((val, index) => {
          // 如果是关键字，则加入结果数组，并进行标记
          if (index < matches.length) {
            if (val) {
              return [{
                text: val,
                isKeyword: false,
              }, {
                text: matches[index],
                isKeyword: true,
              }];
            } else {
              // 如果遇到连续的关键字，则只添加一个带标记的对象
              return [{
                text: matches[index],
                isKeyword: true,
              }];
            }
          } else if (val) {
            // 如果不是关键字，则直接加入结果数组
            return [{
              text: val,
              isKeyword: false,
            }];
          }
          // 过滤掉空字符串
        }).filter(val => val.text !== '');
        // console.log(result,'result'); 
        i.html = <div className={css['my-carousel-page-box-text']}>
          {
            result.reduce((a, v) => {
              return <>{a} {v.isKeyword ? <a>{v.text}</a> : <span>{ v.text}</span>}</>
            },[])
          }
        </div>
  })
  useEffect(() => {
    mySwiperRef.current && mySwiperRef.current.destroy()
    mySwiperRef.current = new Swiper('.swiper-container', {
      autoplay: pages.length>max,
      loop: pages.length>max,
      slidesPerView: pages.length > max ? max : pages.length,
      spaceBetween: 30,
      pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
      }
    });
  }, [series])
  /**
   * 固定格式: 返回的div必须有classNameName/id属性
   */
  return (
    <div className="__easyv-component" style={styles} id={id}>
       <div className="swiper-container" >
        <div className="swiper-wrapper">
          {
            pages.map((v,i) => {
              return <div className="swiper-slide" key={i}>
                <span className={css['backgroud-img']}>
                  {v.html}
                </span>
              </div>
            })
          }
    
        </div>
        <div className="swiper-pagination"></div>
    </div>
    </div>
  );
}
