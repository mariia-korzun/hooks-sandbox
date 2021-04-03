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

const PlanetInfo = ({ id }) => {

    const [planetName, setPlanetName] = useState(null)

    useEffect(() => {
        fetch(`https://swapi.dev/api/planets/${id}/`)
            .then(response => response.json())
            .then(data => setPlanetName(data.name))
            .catch(()=>alert('Error'))
    }, [id])

    return <div> {id} - {planetName}</div>
}



ReactDom.render(<App />, document.getElementById('root'))