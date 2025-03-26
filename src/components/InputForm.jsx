import PropTypes from 'prop-types';
// import  { forwardRef } from "react"
import React from 'react';


// const InputForm = React.forwardRef(({ 
const InputForm = React.forwardRef(({ 
    type, placeholder, label, register, name, error, ...props  }, ref) =>  {
  return (
    <>
    <div className="relative mb-6">
        {label && (<label htmlFor={name} className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>)}

        <input
            {...props}
            type={type}
            label={label}
            name={name}
            {...register}
            placeholder={placeholder}
            ref={ref}
            aria-invalid={ error ? "true" : "false"}
            autoComplete="on"
            className=' px-3 py-2.5 2xl:py-3 border shadow appearance-none rounded-md w-full  leading-tight focus:outline-none focus:shadow'
        />
    </div>
    {error && (<span className='text-red-500 text-sm'>{error}</span>)}
</>
  )
})

InputForm.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    register: PropTypes.object,
    error: PropTypes.string,
};

InputForm.displayName = 'InputForm';
export default InputForm;
