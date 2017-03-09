import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import Term from './Term';

class TermPage extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    })
  };

  state = {
    term: {
      definitions: []
    }
  }


  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {termName} = this.props.params;
    fetch(`/terms?q=${termName}&_limit=1&_embed=definitions`)
      .then(response => response.json())
      .then(data => data[0])
      .then(term => {
        this.setState({term});
      });
  }

  addDef = (body) => {
    fetch('/definitions', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
    .then(() => this.loadData());
  }

  render() {
    const {term} = this.state;

    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        <h1>{term.name}</h1>
        <Term term={term} submit={this.addDef} />
      </div>
    );
  }
}

export default TermPage;
