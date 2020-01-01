import React from 'react';
// import userData from '../../data/profileData';
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button
} from 'reactstrap';
import userData from '../../data/profileData';

const defaultFeedback = {
  customerReviews: ''
}

class Reviews extends React.Component {
  state = {
    review: [],
    newReview: defaultFeedback
  }

  getAllReviews

  reviewStateField = (name, e) => {
    const createNewReview = { ...this.state.newReview };
    createNewReview[name] = e.target.value;
    this.setState({ newReview: createNewReview });
  }

  reviewChange = e => this.reviewStateField('reviews', e);

  submitReview = (e) => {
    e.preventDefault();
    const saveReview = { ...this.state.newReview };
    userData
    .postNewReview(saveReview)
    .then(() => {
      this.getAllReviews();
      this.setState({
        newReview: defaultFeedback
      })
      console.error(saveReview)
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Customer Reviews</h3>
        <div className="row">
          <Form className="col-6 offset-3" onSubmit={this.submitReview}>
            <FormGroup>
            <Label for="username"><h5>Username</h5></Label>
              <Input
              type="text"
              className="review"
              id="Review"
              placeholder="How was your experience?"
              value={this.state.newReview.customerReviews}
              onChange={this.reviewChange}
              />
            </FormGroup>
              <Button type="submit" className="btn btn-primary review-button">Submit Review</Button>
            </Form>
        </div>
      </div>
    )
  }
}

export default Reviews;