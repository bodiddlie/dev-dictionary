import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Col, Well } from 'react-bootstrap';

class AddTerm extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired
  };

  state = {
    name: ''
  }

  createTerm = (evt) => {
    // POST the term to the server.
    evt.preventDefault();
    this.props.submit(this.state.name);
  }

  render() {
    const { hide } = this.props;

    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Term
            </Col>
            <Col sm={10}>
              <FormControl value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.createTerm}>
                Submit the term
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default AddTerm;
