import React, { useState, useEffect, Component } from 'react'
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

const usePlanetInfo = (id) => {
    const [planetName, setPlanetName] = useState(null)

    useEffect(() => {
        let cancelled = false

        fetch(`https://swapi.dev/api/planets/${id}/`)
            .then(response => response.json())
            .then(data => !cancelled && setPlanetName(data.name))
            .catch(() => alert('Error'))
        return () => {
            console.log('cancell fetch')
            cancelled = true
        }
    }, [id])

    return planetName
}

const PlanetInfo = ({ id }) => {

    const name = usePlanetInfo(id)

    return <div> {id} - {name}</div>
}



ReactDom.render(<App />, document.getElementById('root'))