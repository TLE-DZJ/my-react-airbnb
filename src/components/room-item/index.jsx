import PropTypes from 'prop-types'
import React, { memo, useRef, useState } from 'react'
import Rating from '@mui/material/Rating';
import { Carousel } from 'antd';

import { ItemWrapper } from './style'
import IconArrowLeft from '@/assets/svg/icon-arrow-left';
import IconArrowRight from '@/assets/svg/icon-arrow-right';
import Indicator from '@/base-ui/Indicator';
import classNames from 'classnames';

const RoomItem = memo((props) => {
  const { itemData, itemWidth = "33.3333%", itemClick} = props
  const [selectIndex, setSelectIndex] = useState(0)
  const swiperRef = useRef()

  function controlClickHandle(isNext = true, event) {
    isNext ? swiperRef.current.next() : swiperRef.current.prev()
    let newIndex = isNext ? selectIndex + 1: selectIndex - 1
    if (newIndex < 0) newIndex = itemData.picture_urls.length - 1
    if (newIndex > itemData.picture_urls.length - 1) newIndex = 0
    setSelectIndex(newIndex)

    // 阻止事件冒泡
    event.stopPropagation()

  }

  function handleItemClick() {
    if (itemClick) itemClick()

  }

  // 子元素
  const pictureElement = (
    <div className='cover'>
      <img src={itemData.picture_url} alt="" />
    </div>
  )

  const sliderElenment = (
    <div className='slider'>
      <div className='control'>
        <div className="btn left" onClick={e => controlClickHandle(false, e)}>
          <IconArrowLeft width="24" height="24"/>
        </div>
        <div className="btn right" onClick={e => controlClickHandle(true, e)}>
          <IconArrowRight width="24" height="24"/>
        </div>
      </div>

      <div className='indicator'>
        <Indicator selectIndex={selectIndex}>
          {
            itemData.picture_urls?.map((item, index) => {
              return (
                <div className='item' key={item}>
                  <span className={classNames("dot", {active: selectIndex === index})}></span>
                </div>
              )
            })
          }
        </Indicator>
      </div>
      {/* dots是否显示默认的面板指示点 */}
      <Carousel dots={false} ref={swiperRef}>
        {/* 放列表数据 */}
        {
          itemData.picture_urls?.map((item, index) => {
            return (
              <div key={index} className="cover">
                <img src={item} alt="" />
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )

  return (
    <ItemWrapper itemWidth={itemWidth} onClick={handleItemClick}>
      <div className='inner'>
        { !itemData.picture_urls ? pictureElement : sliderElenment }
        <div className='desc'>{itemData.verify_info.messages.join("·")}</div>
        <div className='name'>{itemData.name}</div>
        <div className='price'>¥{itemData.price}/晚</div>
        <div className='bottom'>
          <Rating readOnly 
            value={itemData.star_rating ?? 5} 
            precision={0.1} size="small" 
            sx={{fontSize: "12px", color: "#00848A", marginRight: "-2px"}}/>
          <span className='count'>{itemData.reviews_count}</span>
          { itemData.bottom_info && <span>·{itemData.bottom_info.content}</span> }
        </div>
      </div>
    </ItemWrapper>
  )
})

RoomItem.propTypes = {
  itemData: PropTypes.object
}

export default RoomItem