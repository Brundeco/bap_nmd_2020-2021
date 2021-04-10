import React, { useEffect, useState } from "react";

export default (props) => {
  const [value, setValue] = React.useState();

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.name, e.target.value);
  };

  return (
    <input
      className={props.className}
      placeholder={props.placeholder}
      name={props.name}
      onChange={(e) => handleChange(e)}
      type={props.type}
      value={props.value}
      required={props.required}
    />
  );
};
