import axios from 'axios';
import React from 'react';

const Account = ({token}) => {
    const [watchList, setWatchList] = React.useState([])
    const endpoint = 'http://127.0.0.1:8000/api/v1/accounts/watchlist/list';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }

    const handleLoadWatchlist = React.useCallback(() => {
        axios
            .get(endpoint, {headers: headers})
            .then(res => {
                setWatchList(res.data.results);
            })
    }, [])

    React.useEffect(() => {
        handleLoadWatchlist()
    }, [handleLoadWatchlist])

    console.log(watchList)

    return (
        <h3>Account</h3>
    )
}

export default Account;