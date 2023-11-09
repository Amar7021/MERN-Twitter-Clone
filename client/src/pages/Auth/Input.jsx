const Input = ({ name, type, placeholder, handleChange, maxLength, value }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
    />
  )
}

export default Input
