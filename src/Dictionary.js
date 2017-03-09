import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';

const headers = new Headers({
  'Content-Type': 'application/json'
});

class Dictionary extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object
  }

  state = {
    showAddTerm: false,
    terms: []
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/terms?_embed=definitions')
      .then(response => response.json())
      .then(terms => {
        this.setState({terms});
      });
  }

  toggleAdd = () => this.setState({ showAddTerm: !this.state.showAddTerm })

  addDef = (body) => {
    fetch('/definitions', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
      .then(() => {
        this.loadData();
      })
  }

  addTerm = (name) => {
    const userId = this.context.loggedInUser ? this.context.loggedInUser.id : 0;
    fetch('/terms', {
      method: 'POST',
      body: JSON.stringify({name, userId}),
      headers,
    })
      .then(() => {
        this.loadData();
        this.setState({showAddTerm: false});
      });
  }

  render() {
    const { showAddTerm, terms } = this.state;

    return (
      <div>
        <h2>Terms</h2>
        <Button bsStyle="success" onClick={this.toggleAdd}>
          <Glyphicon glyph="plus-sign" /> Add term
        </Button>
        {showAddTerm && <AddTerm hide={this.toggleAdd} submit={this.addTerm} />}
        <div className="terms">
          {terms.map(term => {
            return <Term key={term.id} term={term} submit={this.addDef} />;
          })}
        </div>
      </div>
    );
  }
}

export default Dictionary;
