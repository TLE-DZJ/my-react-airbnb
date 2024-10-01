import IconArrowLeft from '@/assets/svg/icon-arrow-left'
import IconArrowRight from '@/assets/svg/icon-arrow-right'
import React, { memo, useEffect, useRef, useState } from 'react'
import { ScrollWrapper } from './style'

const ScrollView = memo((props) => {
  /** 记录正在显示的是哪一个按钮 */

  // 记录item索引，偏移量即为索引对应的item的偏移量
  const [posIndex, setPosIndex] = useState(0)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  /** 滚动区域的值 */
  // 使用useRef获取不需要渲染的值
  const scrollRef = useRef()
  const totalDistanceRef = useRef(0)

  // 组件渲染完后，判断内容是否溢出，溢出就显示右侧的按钮
  useEffect(() => {
    // 可滚动区域宽度
    const scrollWidth = scrollRef.current.scrollWidth
    // 内容显示出的宽度
    const clientWidth = scrollRef.current.clientWidth
    totalDistanceRef.current = scrollWidth - clientWidth
    // 按钮显示条件
    setShowRight(totalDistanceRef.current > 0)
  }, [props.children])

  /** 事件处理 */
  function leftClickHandle() {
    scrollPosition(posIndex-1)
  }

  function rightClickHandle() {
    scrollPosition(posIndex + 1)
  }

  function scrollPosition(index) {
    const scrollLeft = scrollRef.current.children[index].offsetLeft
    scrollRef.current.style.transform = `translate(-${scrollLeft}px)`
    // 偏移之后计算一下最新索引
    setPosIndex(index)
    // 是否继续显示右侧按钮
    if (scrollLeft > totalDistanceRef.current) {
      setShowRight(false)
    }
    setShowRight(totalDistanceRef.current > scrollLeft)
    // 只要已经滚动的区域大于0，就显示左侧按钮
    setShowLeft(scrollLeft > 0)
  }

  return (
    <ScrollWrapper>
      {showLeft && (
        <div className='control left' onClick={leftClickHandle}>
          <IconArrowLeft/>
        </div>
      )}
      {showRight && (
        <div className='control right' onClick={rightClickHandle}>
          <IconArrowRight/>
        </div>
      )}
      {/* 内容可变，采用插槽 */}
      <div className='content'>
        <div className='scroll' ref={scrollRef}>
          {props.children}
        </div>
      </div>
    </ScrollWrapper>
  )
})


export default ScrollView