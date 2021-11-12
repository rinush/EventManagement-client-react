import React from 'react'

const UserRow = ({user,deleteUser}) => {
    // const [editing, setEditing] = useState(false)
    // const [cachedItem, setCahedItem] = useState(item)

    return (
        <>
            <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>
                    <button type='button' onClick={()=>deleteUser(user.id)} className="btn btn-danger">delete</button>
                </td>
            </tr>
        </>
    )
}

export default UserRow