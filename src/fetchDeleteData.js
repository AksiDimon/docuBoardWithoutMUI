export function fetchDeleteData (token, id) {
    const url = `https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${id}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        }
    })
    .then(val => val.json())
 }


fetchDeleteData('supersecrettoken_for_user1', 
'a841ce4b-fe65-46ea-bc1a-99e3c32067e4')