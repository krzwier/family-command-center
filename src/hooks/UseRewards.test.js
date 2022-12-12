import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
import { useRewards } from "./UseRewards";
import Chance from "chance";
import { renderHook, act } from "@testing-library/react-hooks";

const chance = Chance();

afterEach(fetch.resetMocks);

test("should make correct fetch call and return correct reward status", async () => {
   const expectedPointBalance = chance.integer();
   const expectedAvailableRewards = [
      {
         RewardId: chance.integer(),
         Money: chance.bool(),
         Description: chance.string(),
         Quantity: chance.integer(),
         Points: chance.integer(),
         IconPath: chance.string()
      }
   ];
   const expectedClaimedRewards = [
      {
         RewardId: chance.integer(),
         Money: chance.bool(),
         Description: chance.string(),
         Quantity: chance.integer(),
         Points: chance.integer(),
         IconPath: chance.string()
      }
   ];
   const expectedPersonId = chance.d100();
   fetch.mockResponse(
      JSON.stringify({
         pointBalance: expectedPointBalance,
         availableRewards: expectedAvailableRewards,
         claimedRewards: expectedClaimedRewards
      })
   );

   const { result, waitFor } = renderHook(() => useRewards(expectedPersonId));

   await expect(fetch).toBeCalledWith(`http://localhost:4001/rewards/personId=${expectedPersonId}`);
   await waitFor(() => expect(result.current.rewardStatus.pointBalance).toBe(expectedPointBalance));
   await waitFor(() =>
      expect(result.current.rewardStatus.availableRewards).toEqual(expectedAvailableRewards)
   );
   await waitFor(() =>
      expect(result.current.rewardStatus.claimedRewards).toEqual(expectedClaimedRewards)
   );
});

test("claimReward should make correct api post and return correct reward status", async () => {
   const expectedStartingPoints = chance.integer();
   const expectedAfterPoints = chance.integer();
   const expectedRewardId = chance.d100();
   const expectedAvailableRewards = [
      {
         RewardId: expectedRewardId,
         Money: chance.bool(),
         Description: chance.string(),
         Quantity: chance.integer(),
         Points: chance.integer(),
         IconPath: chance.string()
      }
   ];
   fetch
      .mockResponseOnce(
         JSON.stringify({
            pointBalance: expectedStartingPoints,
            availableRewards: expectedAvailableRewards,
            claimedRewards: []
         })
      )
      .mockResponseOnce(
         JSON.stringify({
            pointBalance: expectedAfterPoints,
            availableRewards: expectedAvailableRewards,
            claimedRewards: expectedAvailableRewards
         })
      );
   const { result, waitFor } = renderHook(() => useRewards(0));
   await waitFor(() =>
      expect(result.current.rewardStatus.pointBalance).toBe(expectedStartingPoints)
   );
   await waitFor(() =>
      expect(result.current.rewardStatus.availableRewards).toEqual(expectedAvailableRewards)
   );
   await waitFor(() => expect(result.current.rewardStatus.claimedRewards).toEqual([]));

   act(() => result.current.claimReward(expectedAvailableRewards[0]));

   await waitFor(() => expect(fetch.mock.calls.length).toBe(2));
   expect(fetch.mock.calls[1]).toEqual([
      `http://localhost:4001/rewards/claim/personId=0,rewardId=${expectedRewardId}`,
      {
         method: "POST"
      }
   ]);
   await waitFor(() => expect(result.current.rewardStatus.pointBalance).toBe(expectedAfterPoints));
});

test("unClaimReward should make correct api post and return correct reward status", async () => {
   const expectedStartingPoints = chance.integer();
   const expectedAfterPoints = chance.integer();
   const expectedRewardId = chance.d100();
   const expectedAvailableRewards = [
      {
         RewardId: chance.integer(),
         Money: chance.bool(),
         Description: chance.string(),
         Quantity: chance.integer(),
         Points: chance.integer(),
         IconPath: chance.string()
      }
   ];
   const expectedClaimedRewards = [
      {
         RewardId: expectedRewardId,
         Money: chance.bool(),
         Description: chance.string(),
         Quantity: chance.integer(),
         Points: chance.integer(),
         IconPath: chance.string()
      }
   ];
   fetch
      .mockResponseOnce(
         JSON.stringify({
            pointBalance: expectedStartingPoints,
            availableRewards: expectedAvailableRewards,
            claimedRewards: expectedClaimedRewards
         })
      )
      .mockResponseOnce(
         JSON.stringify({
            pointBalance: expectedAfterPoints,
            availableRewards: expectedAvailableRewards,
            claimedRewards: []
         })
      );
   const { result, waitFor } = renderHook(() => useRewards(0));
   await waitFor(() =>
      expect(result.current.rewardStatus.pointBalance).toBe(expectedStartingPoints)
   );
   await waitFor(() =>
      expect(result.current.rewardStatus.availableRewards).toEqual(expectedAvailableRewards)
   );
   await waitFor(() =>
      expect(result.current.rewardStatus.claimedRewards).toEqual(expectedClaimedRewards)
   );

   act(() => result.current.unClaimReward(expectedClaimedRewards[0]));

   await waitFor(() => expect(fetch.mock.calls.length).toBe(2));
   expect(fetch.mock.calls[1]).toEqual([
      `http://localhost:4001/rewards/unclaim/personId=0,rewardId=${expectedRewardId}`,
      {
         method: "POST"
      }
   ]);
   await waitFor(() => expect(result.current.rewardStatus.pointBalance).toBe(expectedAfterPoints));
   await waitFor(() =>
      expect(result.current.rewardStatus.availableRewards).toEqual(expectedAvailableRewards)
   );
   await waitFor(() => expect(result.current.rewardStatus.claimedRewards).toEqual([]));
});
