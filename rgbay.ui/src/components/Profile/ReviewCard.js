import React from 'react';
import {
  CardBody,
  CardText,
  Card,
  Button
} from 'reactstrap';
import './ReviewCard.css';
// import { withRouter } from "react-router";

class ReviewCard extends React.Component {

  deleteComment = () => {
    const productId = this.props.userReviews.productId;
    this.props.deleteComment(productId);
  }

  render() {
    const { userReviews } = this.props;
    return (
      <div>
        <Card>
          <CardBody>
            <CardText className="card-text">{userReviews.username}</CardText>
            <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="review-pic img-fluid"></img>
            <CardText className="card-text">{userReviews.title}</CardText>
            <CardText className="card-text">"{userReviews.review}"</CardText>
            <Button className="btn btn-danger" onClick={this.deleteComment}>Delete Comment</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default ReviewCard;