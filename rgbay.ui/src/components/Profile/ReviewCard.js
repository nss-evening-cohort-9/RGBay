import React from 'react';
import {
  CardBody,
  CardText,
  Card
} from 'reactstrap';
import './ReviewCard.css';

class ReviewCard extends React.Component {
  render() {
    const { userReviews } = this.props;
    console.error(userReviews)
    return (
      <div>
        <Card id={userReviews.feedbackId}>
          <CardBody>
            {/* <div className="btn" key={review.id} to={singleUser} onClick={this.singleUserProfile}>{review.username}</div> */}
            <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="review-pic img-fluid"></img>
            <CardText className="card-text">{userReviews.feedback}</CardText>
            <CardText className="card-text">{userReviews.reviewDate}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default ReviewCard;