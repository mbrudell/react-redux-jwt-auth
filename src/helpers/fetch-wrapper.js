import { store } from '../store/index'
import { authActions  } from '../store/auth.slice'

export const fetchWrapper = { 
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

function request(method) {
    return async (url, body) => {
        const requestOptions = { 
            method,
            headers: authHeader(url)
        }
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json'
            requestOptions.body = JSON.stringify(body)
        }
        const response = await fetch(url, requestOptions)
        return handleResponse(response)
    }
}

function authHeader(url) {
    const token = authToken()
    const isLoggedIn = !!token
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL)
    if(isLoggedIn && isApiUrl) {
        return {'x-access-token': `${token}`}
    } else {
        return {}
    }
}

function authToken() {
    return store.getState().auth.user?.accessToken
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if(!response.ok){
            if([401, 403].includes(response.status) && authToken()){
                const logout = () => store.dispatch(authActions.logout())
                logout()
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}