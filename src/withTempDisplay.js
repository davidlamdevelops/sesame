import React, { PureComponent } from 'react';
import className from './TypeAheadCssNames';

const withTempDisplay = function(Comp) {
    return class extends PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                tempSelection: ''
            }
            this.bindHandlers();
        }

        bindHandlers() {
            this.mouseOver = this.mouseOver.bind(this);
            this.mouseOut = this.mouseOut.bind(this);
            this.setTempSelection = this.setTempSelection.bind(this);
        }

        componentDidMount() {
            document.addEventListener('mouseover', this.mouseOver);
            document.addEventListener('mouseout', this.mouseOut);
          }
        
          componentWillUnmount() {
            document.removeEventListener('mouseover', this.mouseOver);
            document.removeEventListener('mouseout', this.mouseOut);
          }

        mouseOver(e) {
            if(e.target.className === className.option) {
                this.setState({
                    tempSelection: e.target.innerText
                });
            }
        }
        
        mouseOut(e) {
            if(e.target.className === className.option) {
                this.setState({
                    tempSelection: ''
                });
            }    
        }

        setTempSelection(val) {
            this.setState({
                tempSelection: val.toString()
            })
        }

        render() {
            return <Comp {...this.props} {...this.state} setTempSelection={this.setTempSelection} />
        }
    }
}

export default withTempDisplay;