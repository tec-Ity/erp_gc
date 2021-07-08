import React from 'react'

export default function NotFound({hist}) {
    return (
        <div>
            404
            <button onClick={()=>hist.push('/')}>回到主页</button>
        </div>
    )
}
