import React from 'react';
// import userData from '../../data/profileData';
import { 
  Form, 
  FormGroup,
  Input, 
  Button
} from 'reactstrap';
import { withRouter } from "react-router";
import userData from '../../data/profileData';
import ReviewCard from './ReviewCard';
import './Reviews.css';

const defaultFeedback = {
  customerReviews: ''
}

class Reviews extends React.Component {
  state = {
    review: [],
    userReviews: [],
    newReview: defaultFeedback
  }

  getReviews = () => {
    userData
    .getAllReviews()
    .then((review) => {
    this.setState( review.data )
    })
  }

  getUserReviews = () => {
    const  userId  = this.props.match.params.id;
    userData
    .getUserReviews(userId)
    .then((res) => {
      this.setState({ userReviews: res.data })
    })
    .catch(err => console.error("Could not get single reviews", err));
  }

  deleteComment = (reviewId) => {
    userData
        .deleteComment(reviewId)
        .then(() => this.getUserReviews())
        .catch(err => console.error("Unable to delete review", err));
};

  postComment = (e) => {
    e.preventDefault();
    const commentReview = { ...this.state.newReview };
    userData
    .postComment(commentReview)
    .then(() => {
      this.setState({
        newReview: defaultFeedback
      })
      this.getUserReviews();
    })
  }

  reviewStateField = (name, e) => {
    const createNewReview = { ...this.state.newReview };
    createNewReview[name] = e.target.value;
    this.setState({ newReview: createNewReview });
  }

  reviewChange = e => this.reviewStateField('review', e);

  componentDidMount() {
    this.getUserReviews();
  }


  render() {
    const buildReviews = this.state.userReviews.map((rev) => (
      <ReviewCard
      userReviews={rev}
      key={rev.reviewId}
      deleteComment={this.deleteComment}
      />
    ))
    return (
      <div className="container" onSubmit={this.postComment}>
        <h3>Customer Reviews</h3>
        <div className="row">
          <Form className="col-6 offset-3">
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
              {/* <Button type="submit" className="btn btn-primary review-button" onClick={this.submitReview}>Submit Review</Button> */}
              <Button type="sumbit" className="btn btn-primary review-button">Test Button</Button>
            </Form>
            <div className="container">
              {buildReviews}
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Reviews);