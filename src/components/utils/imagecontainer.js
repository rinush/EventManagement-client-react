import React from "react";
import {Link} from "react-router-dom"

const ImageContainer=({src,eve,height,width,padding,recommendation=false})=>{
    const style={height,width,padding}
    return(
        <Link to={`event/${eve.id}`}>
                <img  src={src} style={style} alt="Event"/>
                <h2 ><span>{eve.title}</span></h2>
        </Link>
    )
}

export default ImageContainer;