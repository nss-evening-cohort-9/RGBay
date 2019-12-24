import React from 'react';
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button
} from 'reactstrap';

const reviewInfo = {
  username: '',
  feedback: ''
}

class Reviews extends React.Component {
  state = {
    review: [],
    newReview: reviewInfo
  }

  stringStateField = (name, e) => {
    const makeNewReview = {...this.state.newReview};
    makeNewReview[name] = e.target.value;
    this.setState({ newReview: makeNewReview });
  }

  feedbackChange = e => this.stringStateField('feedback', e);

  render() {
    return (
      <div className="container">
        <h3>Customer Reviews</h3>
        <div className="row">
          <Form className="col-6 offset-3" onSubmit={this.submitReview}>
            <FormGroup>
              <Label for="exampleText">Write a review: </Label>
              <Input 
              type="textarea" 
              className="customer-reviews" 
              id="feedback"
              placeholder="How was your experience?"
              value={this.state.newReview.feedback}
              onChange={this.feedbackChange} 
              />
            </FormGroup>
              <Button type="submit" className="btn btn-primary update-button">Submit Review</Button>
            </Form>
        </div>
      </div>
    )
  }
}

export default Reviews;