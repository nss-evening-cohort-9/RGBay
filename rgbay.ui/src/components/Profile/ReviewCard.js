import React from 'react';
import {
  CardBody,
  CardText,
  Card
} from 'reactstrap';

class ReviewCard extends React.Component {
  render() {
    const { review } = this.props;
    return (
      <div>
        <Card>
          <CardBody>
            {/* <Link className="btn" id={info.id} to={singleUser} params={{ user: info }} onClick={this.singleUserProfile}>{info.username}</Link> */}
            <img src="https://i.pinimg.com/236x/c2/7c/27/c27c277903bc87b329a29005a1a371b2--funny-facebook-picture-collection.jpg" alt="profile-avi" className="bio-pic img-fluid"></img>
            <CardText className="card-text">{review.feedback}</CardText>
            <CardText className="card-text">{review.reviewdate}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default ReviewCard;