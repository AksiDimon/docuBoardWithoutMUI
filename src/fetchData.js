// const token = localStorage.getItem('authToken');
export function fetchData (token) {
    const url = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            "x-auth": token,
        }
    })
    .then(result => result.json())
    // .then(data => console.log(data, '🎃'))
}

 fetchData('supersecrettoken_for_user1').then(val => console.log(val))