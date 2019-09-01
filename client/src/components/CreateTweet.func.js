// Dependencies
import React, { useState } from 'react';
import Mutation from '../shared/components/Mutation';

// Images (this image is on the repository)
import UntitledAvatar from './logo.jpeg';

// Queries
import { MUTATION_CREATE_TWEET } from '../graphql/mutations';
import { QUERY_GET_TWEETS } from '../graphql/queries';

export default function CreateTweet() {
  // Local state
  const [tweet, setNewTweet] = useState('');

  // Handle change for textarea
  const handleChange = e => setNewTweet(e.target.value);

  // Executing createTweet mutation to add a new Tweet
  const handleSubmit = mutation => {
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

  return (
    <Mutation
      mutation={MUTATION_CREATE_TWEET}
      query={QUERY_GET_TWEETS}
      onCompleted={() => {
        // On mutation completed we clean the tweet state
        setNewTweet('');
      }}
    >
      {createTweet => (
        <div className="createTweet">
          <header>Write a new Tweet</header>
          <section>
            <img src={UntitledAvatar} alt="Untitled" />
            <textarea
              placeholder="Write your tweet here..."
              value={tweet}
              onChange={(e) => handleChange(e)}
            />
          </section>
          <div className="publish">
            <button
              onClick={() => {
                handleSubmit(createTweet);
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
