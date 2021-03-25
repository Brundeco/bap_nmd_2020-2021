import React from 'react'

export default (props) => {
  return (
    <div className="preloader-wrapper-2">
      <section>
        <div className="origin" />
        <div className="origin" />
      </section>
      <div className="loading-spinner"></div>
      <h2 className="preloader-title"> {props.text}</h2>
    </div>
  )
}
