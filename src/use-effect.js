import React, { useState, useEffect, Component } from 'react'
import ReactDom from 'react-dom'

const App = () => {
    const [value, setValue] = useState(0)
    const [visible, setVisibility] = useState(true)

    if (visible) {
        return (
            <div>
                <button onClick={() => { setValue((value) => value + 1) }}>+</button>
                <button onClick={() => { setVisibility(false) }}>hide</button>
                {/* <ClassCounter value={value} /> */}
                <HookCounter value={value} />
                <Notification />
            </div>
        )
    } else {
        return <button onClick={() => { setVisibility(true) }}>show</button>
    }
}

const HookCounter = ({ value }) => {

    //вызовется один раз, аналог componentDidMount
    useEffect(() => {
        console.log('mount')
    }, [])


    //вызовется при каждом обновлении эл-та, аналог componentDidUpdate, различие в том,
    // что вызовется и первый раз при mount
    useEffect(() => {
        console.log('update')
    })


    //вызовется один раз при mount и запишет функцию очистки, которая будет выполнятся при unmount и тогда когда нужно запустить след эффект
    // когда нужно запустить след эффект сначала вызовется функция очистки а потом useEffect
    //первый раз нет, только при изменении
    useEffect(() => {
        return () => { console.log('unmount') }//вызывается на любое изменение value
    }, [value])



    return <p>{value}</p>
}

const Notification = () => {

    const [visible, setVisibility] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => { setVisibility(false) }, 1500)

        return () => clearTimeout(timeout)
    }, [])

    if (visible) {
        return <div><p>Hello</p></div>
    } else {
        return <div>{null}</div>
    }

}

class ClassCounter extends Component {

    componentDidMount() {
        console.log('class:mount')
    }

    componentDidUpdate() {
        console.log('class:update')
    }

    componentWillUnmount() {
        console.log('class:unmount')
    }

    render() {
        return (
            <p>{this.props.value}</p>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))