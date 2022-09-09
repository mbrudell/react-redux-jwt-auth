import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { history } from '../helpers'

export { PrivateRoute }

function PrivateRoute({children}) {
    const { user: authUser } = useSelector(x => x.auth)

    if (!authUser) { // not logged in redirect to login page
        return <Navigate to="/login" state={{ from: history.location }} />
    }
    // authorised return child components
    return children
}