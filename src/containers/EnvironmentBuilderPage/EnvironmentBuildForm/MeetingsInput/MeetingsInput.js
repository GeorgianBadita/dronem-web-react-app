import React, {Component} from 'react';
import MeetingInput from "./MeetingInput/MeetingInput";

class MeetingsInput extends Component {
    render() {
        return (
            [...Array(this.props.numInputs).keys()]
                .map(elem => {
                    return (
                        <MeetingInput changeHandler={this.props.inputChangeHandler}
                                      key={elem}
                        />
                    )
                })
        )
    }
}

export default MeetingsInput;