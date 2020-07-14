import React from 'react'
import { useParams } from 'react-router-dom'

export default function EditTask(props) {
    let { taskId } = useParams();
    return (
        <div>
            <h1>Edit form for task{taskId}</h1>
        </div>
    )
}
