

export function checkCORS () {
    const url = 'https://sinyakov.com/hello.json'

    return fetch(url)
    .then(val => val.json())
    .then(console.log)
}

// checkCORS()