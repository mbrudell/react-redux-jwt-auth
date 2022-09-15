import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userActions } from './store'

export { Home }

function Home() {
    const dispatch = useDispatch()
    const { user: authUser} = useSelector(x => x.auth)
    const { users } = useSelector(x => x.users)

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [])

    return (
        <div>
            <h1>Hi {authUser.firstname}! </h1>
            <p>You are logged in React 18 + Redux & JWT!!</p>
            <h3>Users from a secure api end point:</h3>
            { users.length &&
                <ul>
                    { users.map(user =>
                        <li key={user.id}>{user.firstname} {user.lastname}</li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>
    )
}