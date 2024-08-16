import React, { useEffect, useState } from "react";
import LeaderboardRowCard from "../components/cards/LeaderboardRowCard";
import axios from "axios";

function Leaderboard() {
  const [ranks, setRanks] = useState([]);
  const [itemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/leaderboard/getTimedModeList").then((response) => {
      setRanks(response.data);
    });
  }, []);

  useEffect(() => {
    ranks.forEach((item, index) => {
      itemList.push(
        <div key={index}>
          <LeaderboardRowCard
            profilePicture={item.profilePicture}
            username={item.username}
            email={item.email}
            bestScore={item.bestScore}
            rank={index + 1}
          ></LeaderboardRowCard>
        </div>
      );
    });

    setIsLoading(false);

    console.log("Items list: " + itemList);
  }, [ranks.length]);

  return !isLoading ? (
    <div>
      <div className="flex justify-center">
        <ul className="divide-gray-200 divide-y pt-8">{itemList}</ul>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default Leaderboard;
