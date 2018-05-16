const getPuzzle = async (wordCount = 1) => {
    const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to fetch puzzle')
    }
}

const getCountry = async (countryCode) => {
    const response = await fetch('http://restcountries.eu/rest/v2/all')

    if (response.status === 200) {
        const data = await response.json()
        return data.find((item) => item.alpha2Code === countryCode.toUpperCase())
    } else {
        throw new Error('Unable to fetch country')
    }
}

const getLocation = async () => {
    const response = await fetch('http://ipinfo.io/json?token=0b865d406a21c0')

    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error('Unable to fetch the current location.')
    }
}

const getCurrentCountry = async () => {
    const location = await getLocation()
    return getCountry(location.country)
}

export { getPuzzle as default }