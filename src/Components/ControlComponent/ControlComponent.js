import React, {Component} from 'react';
import View from './View';
import ControlLibCommon from "../ControlLibCommon";

/**control component */
class ControlComponent extends Component {

    /**local state of this component */
    state = {
        list: [],
    }

    /**method to add new input*/
    addNewInput = (ev, type) => {
        let {list} = this.state;
        let params = {};
        type === 'numeric' ? params.typeField = "numeric" : params.typeField = "calc";
        list.push(<ControlLibCommon {...params}/>);
        this.setState({list});
    }

    /**method to destroy and clear all components*/
    destroyAll = () => {
        const list = [];
        this.setState({list});
    }

    /**method render of this comp  for render content*/
    render() {
        const {list} = this.state;
        const {addNewInput, destroyAll} = this;

        const data = {
            list,
            addNewInput,
            destroyAll
        }

        return <View {...data} />
    }

}

export default ControlComponent;
