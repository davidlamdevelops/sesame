import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import className from './TypeAheadCssNames';
import './TypeAhead.css';
import withTempDisplay from './withTempDisplay';

class TypeAhead extends PureComponent {

  constructor() {
    super();
    this.state = {
      suggestions: [],
      selection: '',
    }
    this.currentIndex = 0;
    this.createRefs();
    this.bindFns();
  }

  createRefs() {
    this.suggestions = React.createRef();
    this.search = React.createRef();
  }

  bindFns() {
    this.handleInput = this.handleInput.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.handleKeyStroke = this.handleKeyStroke.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createOptionDisplay = this.createOptionDisplay.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyStroke);
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyStroke);
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if(e.target !== this.search.current && e.target.className !== className.option) {
      if(this.state.suggestions.length) {
        this.setState({
          suggestions: []
        })
        this.setCurrentScrollIndex(0);
      }
    }
  }

  handleKeyStroke(e) {
    const suggestions = this.suggestions.current.children;
    // Key down arrow
    if(e.keyCode === 40) {
      e.preventDefault();
      if(e.target === this.search.current) {
        let first = suggestions[this.currentIndex];
        if(first) {
          first.focus();
        }
      } else if (e.target.className === className.option && this.currentIndex < suggestions.length - 1) {
        this.setCurrentScrollIndex(this.currentIndex + 1);
        let next = suggestions[this.currentIndex];
        if(next) {
          next.focus();
        }
      }      
    // Key up arrow
    } else if (e.keyCode === 38) {
      e.preventDefault();
      if(e.target.className === className.option && this.currentIndex > 0) {
        this.setCurrentScrollIndex(this.currentIndex - 1);
        let up = suggestions[this.currentIndex];
        if(up) {
          up.focus();
        }
      }
    // Enter
    } else if (e.keyCode === 13) {
      if (e.target.className === className.option) {
        this.setSelection({name: e.target.innerText});
        this.setCurrentScrollIndex(0);
      } else if (e.target === this.search.current) {
        this.setState({
          suggestions: []
        })
        this.setCurrentScrollIndex(0);
      }
    }
  }

  handleInput(e) {
    if(!e.target.value) this.setState({suggestions: []});
    if(e.target.value && !e.target.value[e.target.value.length-1].match(/[A-Za-zçí' ]/)) {
      e.preventDefault();
      return;
    }
    e.persist();
    this.setState({
      selection: e.target.value,
    });
    if(e.target.value.length > 0) debounce(() => this.getSuggestions(e.target.value), 250)();
  }

  getSuggestions(val) {
    if(val && this.props.list && this.props.list.length) {
      val = val.toLowerCase();
      const _suggestions = [], { list } = this.props, _this = this; 
      for(var i = 0; i < list.length; i++) {
        if(list[i].lowerCase.indexOf(val) > -1) {
          list[i].display = {__html: this.createOptionDisplay(list[i], val) };
          _suggestions.push(list[i]);
        }
      }
      this.setState({ suggestions: _suggestions}, () => {
        _this.setCurrentScrollIndex(0);
      });
    }
  }

  createOptionDisplay(suggestion, val) {
    const reg = new RegExp(val, "g");
    let display = suggestion.lowerCase.replace(reg, "<strong>" + val + "</strong>");
    return display.indexOf(val) === 8 ? display.slice(0,8) + display[8].toUpperCase() + display.slice(9) : display[0].toUpperCase() + display.slice(1);
  }

  setSelection(s) {
    this.setState({
      selection: s.name,
      suggestions: [],
    });
    if(this.props.setTempSelection) {
      this.props.setTempSelection('')
    }
    this.setCurrentScrollIndex(0);
  }

  setCurrentScrollIndex(val) {
    this.currentIndex = val >= 0 ? val : 0;
  }

  render() {
    return (
      <div className={className.container}>
        <input className={className.search} ref={this.search} type="text" onChange={this.handleInput} value={this.props.tempSelection || this.state.selection} placeholder="Search" />
        <div className={className.suggestions} ref={this.suggestions}>
          { this.state.suggestions.length > 0 ? (
              this.state.suggestions.map(suggestion => <div className={className.option} key={suggestion.id} tabIndex="0" onClick={() => this.setSelection(suggestion)} dangerouslySetInnerHTML={suggestion.display}></div>)
            ) : null
          }
        </div>
      </div>
    )
  }

}

export default withTempDisplay(TypeAhead);
