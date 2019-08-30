// Dependencies
import React, { Component } from 'react';
import moment from 'moment';

// Components
import Mutation from '../shared/components/Mutation';

// Queries
import {
  MUTATION_DELETE_TWEET,
  MUTATION_UPDATE_TWEET
} from '../graphql/mutations';
import { QUERY_GET_TWEETS } from '../graphql/queries';

// Images (those are temporary images and exists on the repository)
import TwitterLogo from './twitter.svg';
import UntitledAvatar from './logo.jpeg';

class Tweet extends Component {
  // Local State
  state = {
    currentTweet: false
  };

  // Enabling a textarea for edit a Tweet
  handleEditTweet = _id => {
    const {
      data: { getTweets: tweets }
    } = this.props;
    const selectedTweet = tweets.find(tweet => tweet._id === _id);
    const currentTweet = {
      [_id]: selectedTweet.tweet
    };
    this.setState({
      currentTweet
    });
  };

  // Handle Change for textarea
  handleChange = (value, _id) => {
    const { currentTweet } = this.state;
    currentTweet[_id] = value;
    this.setState({
      currentTweet
    });
  };

  // Delete tweet mutation
  handleDeleteTweet = (mutation, _id) => {
    // Sending variables
    mutation({
      variables: {
        _id
      }
    });
  };

  // Update tweet mutation
  handleUpdateTweet = (mutation, value, _id) => {
    // Sending variables

    mutation({
      variables: {
        _id,
        tweet: value
      }
    });
  };
  render() {
    // Getting the data from getTweets query
    const {
      data: { getTweets: tweets }
    } = this.props;

    // currentTweet state
    const { currentTweet } = this.state;

    // Mapping the tweets
    return tweets.map(({ _id, tweet, author, createdAt }) => (
      <div className="tweet" key={`tweet-${_id}`}>
        <div className="author">
          <img src={UntitledAvatar} alt="untitled" />
          <strong>{author}</strong>
          <div className="twitter-logo">
            <img src={TwitterLogo} alt="Twitter" />
          </div>
        </div>
        <div className="content">
          {/**
           * If there is no currentTweet being edited then
           * we display the tweet as a text otherwise we
           * render a textarea with the tweet to be edited
           */}
          {!currentTweet[_id] ? (
            tweet
          ) : (
            <Mutation
              mutation={MUTATION_UPDATE_TWEET}
              query={QUERY_GET_TWEETS}
              onCompleted={() => {
                // Once the mutation is completed we clear our
                // currentTweet state
                this.setState({
                  currentTweet: false
                });
              }}
            >
              {updateTweet => (
                <textarea
                  autoFocus
                  className="editTextarea"
                  value={currentTweet[_id]}
                  onChange={e => {
                    this.handleChange(e.target.value, _id);
                  }}
                  onBlur={e => {
                    this.handleUpdateTweet(updateTweet, e.target.value, _id);
                  }}
                />
              )}
            </Mutation>
          )}
        </div>
        <div className="date">
          {/* Rendering the createdAt date (MMM DD, YYYY) */}
          {moment(createdAt).format('MMM DD, YYYY')}
        </div>
        {/* Rendering edit icon */}
        <div
          className="edit"
          onClick={() => {
            this.handleEditTweet(_id);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </div>
        {/* Mutation for delete a tweet */}
        <Mutation mutation={MUTATION_DELETE_TWEET} query={QUERY_GET_TWEETS}>
          {deleteTweet => (
            <div
              className="delete"
              onClick={() => {
                this.handleDeleteTweet(deleteTweet, _id);
              }}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </div>
          )}
        </Mutation>
      </div>
    ));
  }
}
export default Tweet;
