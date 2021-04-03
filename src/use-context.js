import React, {useContext} from 'react'

import ReactDOM from 'react-dom'

const Context = React.createContext()

const App = () => {
    return (
        <Context.Provider value="Hello, World!">
            <div>
                <Child />
            </div>
        </Context.Provider>
    )
}

const Child = () => {
    const value = useContext(Context)

    return (
        <span>
            {value}
        </span>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
