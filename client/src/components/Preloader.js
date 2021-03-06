import React from 'react'

export default (props) => {
  return (
    <div className="disable-click-evts">
      <div className="preloader-wrapper">
        <h2 className="preloader-title"> {props.text}</h2>
        <img src={props.image} alt="" />
        {/* <section>
        <div className="origin" />
        <div className="origin" />
      </section> */}
        {/* <div className="loading-spinner"></div> */}
        <div className="loading-dots">
          <div className="bounce"></div>
          <div className="bounce-2"></div>
          <div className="bounce-3"></div>
        </div>
      </div>
    </div>
  )
}
