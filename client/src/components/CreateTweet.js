// Dependencies
import React, { Component } from 'react';
import Mutation from '../shared/components/Mutation';

// Images (this image is on the repository)
import UntitledAvatar from './logo.jpeg';

// Queries
import { MUTATION_CREATE_TWEET } from '../graphql/mutations';
import { QUERY_GET_TWEETS } from '../graphql/queries';

class CreateTweet extends Component {
  // Local state
  state = {
    tweet: ''
  };

  // Handle change for textarea
  handleChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      tweet: value
    });
  };

  // Executing createTweet mutation to add a new Tweet
  handleSubmit = mutation => {
    const tweet = this.state.tweet;
    const author = '@squirmlabs';
    const createdAt = new Date();
    mutation({
      variables: {
        tweet,
        author,
        createdAt
      }
    });
  };

  render() {
    return (
      <Mutation
        mutation={MUTATION_CREATE_TWEET}
        query={QUERY_GET_TWEETS}
        onCompleted={() => {
          // On mutation completed we clean the tweet state
          this.setState({
            tweet: ''
          });
        }}
      >
        {createTweet => (
          <div className="createTweet">
            <header>Write a new Tweet</header>
            <section>
              <img src={UntitledAvatar} alt="Untitled" />
              <textarea
                placeholder="Write your tweet here..."
                value={this.state.tweet}
                onChange={this.handleChange}
              />
            </section>
            <div className="publish">
              <button
                onClick={() => {
                  this.handleSubmit(createTweet);
                }}
              >
                Tweet it!
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTweet;
