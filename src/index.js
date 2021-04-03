import React, { useState, useEffect, useCallback } from 'react'
import ReactDom from 'react-dom'

const App = () => {
    const [value, setValue] = useState(1)
    const [visible, setVisibility] = useState(true)

    if (visible) {
        return (
            <div>
                <button onClick={() => { setValue((value) => value + 1) }}>+</button>
                <button onClick={() => { setVisibility(false) }}>hide</button>
                <PlanetInfo id={value} />
            </div>
        )
    } else {
        return <button onClick={() => { setVisibility(true) }}>show</button>
    }
}

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}/`)
        .then(response => response.json())
        .then(data => data)
        .catch(() => alert('Error'))
}


const useRequest = (request) => {

    const initialState = {
        data: null,
        loading: true,
        error: false
    }

    const [dataState, setDataState] = useState(initialState)

    useEffect(() => {
        setDataState(initialState)
        let cancelled = false

        request()
            .then(data =>
                !cancelled && setDataState({
                    data,
                    loading: false,
                    error: false
                }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error: true
            }))

        return () => {
            console.log('cancell fetch')
            cancelled = true
        }
    }, [request])

    return dataState
}
const usePlanetInfo = (id) => {

    const request = useCallback(() => getPlanet(id), [id])
    return useRequest(request)
}

const PlanetInfo = ({ id }) => {

    const { data, loading, error } = usePlanetInfo(id)

    if (error) {
        return <div>Something is wrong</div>
    }

    if (loading) {
        return <div>loading...</div>
    }

    return <div> {id} - {data && data.name}</div>
}



ReactDom.render(<App />, document.getElementById('root'))