import PropTypes from 'prop-types'
import React from 'react'
export default function Input(props) {

    const { name, type, id, className, label, labelFor,mainDivClass,labelClass,inputDivClass,register,inputClass,errors,value,placeholder } = props
    return (
        <div className={mainDivClass}>
          {label &&  <label for={labelFor?labelFor:id} className={labelClass}>{label}</label>}
            <div className={inputDivClass}>
                <input value={value} placeholder={placeholder}   {...register(name)} type={type} className={inputClass} id={id} />
            </div>
            {errors && errors[name] && <p>{errors[name].message}</p>}
        </div>
    )
}

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    labelFor: PropTypes.string,
    inputClass:PropTypes.string,
    inputDivClass:PropTypes.string,
    errors:PropTypes.any
}
Input.defaultProps = {
    name:'',
    type:'text',
    id:'',
    mainDivClass:'mb-3 row',
    labelClass:'col-sm-3 col-form-label ',
    inputDivClass:'col-sm-9',
    inputClass:'form-control',
    label:'',
    
  
}