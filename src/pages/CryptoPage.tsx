import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface TwitterCryptoTweet {
  id: string;
  url: string;
  text: string;
  author_username: string;
  tweet_created_at: string;
  likecount: number;
  retweetcount: number;
}

const fetchTweets = async (): Promise<TwitterCryptoTweet[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/v2/twitter-crypto/tweets`);
  return response.data;
};

const CryptoPage: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const { data: tweets, isLoading: tweetsLoading, error: tweetsError } = useQuery<TwitterCryptoTweet[], Error>({
    queryKey: ['cryptoTweets'],
    queryFn: fetchTweets,
  });

  if (tweetsLoading) return <div>Loading tweets...</div>;
  if (tweetsError) return <div>Error fetching tweets: {tweetsError.message}</div>;

  const filteredTweets = selectedAuthor
    ? tweets?.filter(tweet => tweet.author_username === selectedAuthor)
    : tweets;

  return (
    <div className="flex flex-col space-y-4">
      {/* <TokenSentimentChart /> */}
      {/* <UniqueTickers /> */}
      <div className="flex">
        <div className="w-1/3 pr-4">

        </div>
        <div className="w-2/3 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Crypto Tweets</h2>
            {selectedAuthor && (
              <Button onClick={() => setSelectedAuthor(null)}>Clear Filter</Button>
            )}
          </div>
          {filteredTweets && filteredTweets.length > 0 ? (
            filteredTweets.map((tweet) => (
              <Card key={tweet.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={`https://unavatar.io/twitter/${tweet.author_username}`} />
                      <AvatarFallback>{tweet.author_username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-bold">@{tweet.author_username}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tweet.text}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>{new Date(tweet.tweet_created_at).toLocaleString()}</span>
                    <span className="ml-2">❤️ {tweet.likecount}</span>
                    <span className="ml-2">🔁 {tweet.retweetcount}</span>
                  </div>
                  <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
                    View on Twitter
                  </a>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">No tweets to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;
