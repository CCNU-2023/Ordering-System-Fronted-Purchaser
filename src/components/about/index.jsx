import React, { useEffect } from 'react'

export default function About(props) {

    useEffect(() => {
        console.log(props)
        console.log(React.Children.toArray())
    
      },[])
    
    return (
        <div>{props.name}-{props.haxi}</div>
    )
    }
