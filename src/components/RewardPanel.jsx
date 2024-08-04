import { AvailableRewardBoard } from "./AvailableRewardBoard";
import { ClaimedRewardBoard } from "./ClaimedRewardBoard";
import { PropTypes } from "prop-types";
import React, { useCallback } from "react";
import { ClaimedReward } from "./ClaimedReward";
import { AvailableReward } from "./AvailableReward";
import { usePreview } from "react-dnd-preview";
import { ItemTypes } from "../ItemTypes";
import { Stack, Card, Grid, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export const RewardGhost = () => {
  const { itemType, display, item, style } = usePreview();
  if (!display) {
    return null;
  }
  return (
    <div style={{ ...style, width: "calc(50% - 90px)", opacity: "50%" }}>
      {itemType === ItemTypes.CLAIMED_REWARD ? (
        <ClaimedReward
          rewardId={item.RewardId}
          dollar={item.dollar}
          quantity={item.quantity}
          description={item.description}
          points={item.points}
          iconPath={item.iconPath}
        />
      ) : (
        <AvailableReward
          rewardId={item.RewardId}
          dollar={item.dollar}
          quantity={item.quantity}
          description={item.description}
          points={item.points}
          iconPath={item.iconPath}
        />
      )}
    </div>
  );
};

export const RewardPanel = ({ rewardStatus, claimReward, unClaimReward }) => {
  const onAvailableDrop = useCallback(
    (reward) => {
      unClaimReward(reward);
    },
    [unClaimReward]
  );

  const onClaimDrop = useCallback(
    (reward) => {
      claimReward(reward);
    },
    [claimReward]
  );

  return (
    <Grid container height="calc(100% - 180px)">
      <Grid container item flexDirection="col" justifyContent="end" xs={3}>
        <Stack alignItems="center" padding={4}>
          <EmojiEventsIcon sx={{ width: "64px", height: "64px" }} />
          <Typography variant="h3">{rewardStatus.PointBalance}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={5} width="100%">
          <AvailableRewardBoard
            onDrop={onAvailableDrop}
            availableRewards={rewardStatus.AvailableRewards}
          />
          <Card>
            <ClaimedRewardBoard
              onDrop={onClaimDrop}
              claimedRewards={rewardStatus.ClaimedRewards}
            />
          </Card>
          <RewardGhost />
        </Stack>
      </Grid>
    </Grid>
  );
};

RewardPanel.propTypes = {
  rewardStatus: PropTypes.object,
  claimReward: PropTypes.func,
  unClaimReward: PropTypes.func,
};
