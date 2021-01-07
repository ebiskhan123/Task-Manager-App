
import React from 'react'

const Action = (props) => (
    <div>
        <button className="big-button" onClick={props.handlepick} disabled={props.mustdisable} >What should I do</button>
    </div>
)

export default Action;