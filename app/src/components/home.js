import React from 'react'
import styled from 'styled-components'

const Container = styled.View `

`
const Text = styled.Text `

`

export default class Home extends React.Component {



    constructor(props){
        super(props);
    }


    render() {
        const {store} = this.props;
        return (
            <Container>

                <Text>Home Screen!</Text>
            </Container>
        )
    }
}