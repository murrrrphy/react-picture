import React from 'react'
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../icons', true, /\.svg$/));} catch (error) {console.log(error);}

const Icon = (props) => {
  return (
    <svg className="icon">
      {props.name && <use xlinkHref={'#'+props.name}/>}
    </svg>
  )
}

export default Icon