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
import ReviewCard from './ReviewCard';

const defaultFeedback = {
  customerReviews: ''
}

class Reviews extends React.Component {
  state = {
    review: [],
    newReview: defaultFeedback
  }

  getAllReviews = (e) => {
    e.preventDefault();
    userData
    .getAllReviews()
    .then((review) => {
    this.setState({ review })
    })
  }

  reviewStateField = (name, e) => {
    const createNewReview = { ...this.state.newReview };
    createNewReview[name] = e.target.value;
    this.setState({ newReview: createNewReview });
  }

  reviewChange = e => this.reviewStateField('reviews', e);

  // submitReview = (e) => {
  //   e.preventDefault();
  //   const saveReview = { ...this.state.newReview };
  //   userData
  //   .postNewReview(saveReview)
  //   .then(() => {
  //     this.getAllReviews();
  //     this.setState({
  //       newReview: defaultFeedback
  //     })
  //     console.error(saveReview)
  //   })
  // }

  render() {
    const buildReviews = this.state.review.map((review) => (
      <ReviewCard
        key={review.id}
        review={review}
        getAllReviews={this.getAllReviews}
      />
    ))
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
              <Button className="btn btn-success test-button" onClick={this.getAllReviews}>Test</Button>
            </Form>
            <div className="row">
              {buildReviews}
            </div>
        </div>
      </div>
    )
  }
}

export default Reviews;