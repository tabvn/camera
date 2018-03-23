import React from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


const Wrapper = styled.div `
    cusror: pointer;
    
`

const Video = styled.div `
    width: 240px;
    height: 120px;
    border: 1px solid rgba(0,0, 0, 0.1);
   
`
const Title = styled.h2 `
    font-size: 17px;
`

class CameraItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            streamUrl: null,
        }
    }

    render() {
        const {camera, store} = this.props;
        return (
            <Wrapper>
                <Video onClick={() => {
                    this.props.call(camera);
                }}>
                    <video src={this.state.streamUrl}/>
                </Video>
                <Title>{camera.name}</Title>
            </Wrapper>
        )


    }
}

const mapStateToProps = (state, props) => ({
    app: state.app,
    model: state.model,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    call: (camera) => {
        return (dispatch, getState, {service, pubSub}) => {

            const mySocketId = pubSub.id();
            pubSub.broadcast(`camera_join_${camera.id}`, {from: pubSub.id()});


            const exchangeTopic = `camera_exchange_${camera.id}_${mySocketId}`;

            pubSub.subscribe(exchangeTopic, (data) => {

                console.log("Receive exchange from topic:", exchangeTopic, data);
            });
        }
    },
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraItem)