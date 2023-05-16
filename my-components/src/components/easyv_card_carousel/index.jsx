import React,{useEffect,useState} from "react";
// 导入Ant Design的样式文件
// 导入需要使用的Ant Design组件
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import css from "./styles/index.module.css";



export default function (props) {
  const { left, top, width, height, id, data, configuration: { series, max } } = props;

  // 把configuration.series obj转换为数组
  const array = JSON.parse(JSON.stringify(Object.keys(series).map(v => series[v])))

  //根据max 改为二阶数组
  const pages = []
  for (let i = 0; i < Math.ceil(array.length/max); i++){
    pages.push(array.slice(i*max, (i+1)*max));  // 0 4  4 8 8 12
  }

  //截取关键字拼接HTML
  pages.forEach(v => {
    // v 一页
    v.forEach(i => {
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
      console.log(i.html,'html');
    })
  })
  console.log(pages,"pages");
  // 自定义逻辑
  const styles = {
    position: "absolute",
    width,
    height,
    textAlign: "center",
  };
  useEffect(() => {
    // console.log(series, pages,"configuration.series",);
  },[series])
  /**
   * 固定格式: 返回的div必须有className/id属性
   */
  return (
    <div className="__easyv-component" style={styles} id={id}>
      <Carousel autoplay className={css['my-carousel']} >
        {pages.map((page,pageNo) => {
          return <div  className={css['my-carousel-page']} key={pageNo} >
            {page.map((box,boxNo) => {
              return <div  className={css['my-carousel-page-box']} style={{height}}  key={boxNo}>
                      {box.html}
                    </div>
                  })}       
                </div>
      })}
      </Carousel>
    </div>
  );
}
