import React,{useEffect,useState} from "react";
// 导入Ant Design的样式文件
import 'antd/dist/antd.css';
import css from "./styles/index.module.css";

// 导入需要使用的Ant Design组件
import { Carousel } from 'antd';

export default function (props) {
  const { left, top, width, height, id, data, configuration: { series, max } } = props;
   // 把configuration.series obj转换为数组
  const array = Object.keys(series).map(v => series[v])
  //根据max 改为二阶数组
  const cards = []
  for (let i = 0; i < array.length; i++){
    cards.push(arr.slice(i, i + max));
  }
  // 自定义逻辑
  const styles = {
    position: "absolute",
    left,
    top,
    width,
    height,
    textAlign: "center",
  };
  useEffect(() => {
    console.log(series, cards,"configuration.series",);
  },[series])
  /**
   * 固定格式: 返回的div必须有className/id属性
   */
  return (
    <div className="__easyv-component" style={styles} id={id}>
      <Carousel autoplay className="my-carousel">
        {cards.map(v => {
          return <div>{ v.content + v.keyCode }</div>
      })}
      </Carousel>
    </div>
  );
}
