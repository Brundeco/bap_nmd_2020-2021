import React from 'react'

export default (props) => {
  const [value, setValue] = React.useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange(e.target.name, e.target.value)
  }

  return (
    // <div className="form-group">
    <textarea
      className={props.className}
      placeholder={props.placeholder}
      name={props.name}
      onChange={(e) => handleChange(e)}
      type={props.type}
      value={props.value ? props.value : value}
      required={props.required}
    />
    // </div>
  )
}
