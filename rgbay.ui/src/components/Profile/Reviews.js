import React from 'react';
// import userData from '../../data/profileData';
import { 
  Form, 
  FormGroup,
  Input, 
  Button
} from 'reactstrap';
import userData from '../../data/profileData';
import ReviewCard from './ReviewCard';
import './Reviews.css';

const defaultFeedback = {
  customerReviews: ''
}

class Reviews extends React.Component {
  state = {
    review: [],
    newReview: defaultFeedback
  }

  getAllReviews = () => {
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

  reviewChange = e => this.reviewStateField('review', e);
  
  // componentDidMount() {
  //   this.getAllReviews();
  // }

  submitReview = (e) => {
    e.preventDefault();
    const saveReview = { ...this.state.newReview };
    userData
    .postReview(saveReview)
    .then(() => {
      this.getAllReviews();
      this.setState({
        newReview: defaultFeedback
      })
    })    
  }


  render() {
    const buildReviews = this.state.review.map((review) => (
      <ReviewCard
        key={review.feedbackId}
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
              <Input
              type="text"
              className="review"
              id="userReview"
              placeholder="How was your experience?"
              value={this.state.newReview.review || ''}
              onChange={this.reviewChange}
              />
            </FormGroup>
              <Button type="submit" className="btn btn-primary review-button" onClick={this.submitReview}>Submit Review</Button>
            </Form>
            <div className="container">
              {buildReviews}
            </div>
        </div>
      </div>
    )
  }
}

export default Reviews;