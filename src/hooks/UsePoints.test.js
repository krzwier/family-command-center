import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
import { usePoints } from "./UsePoints";
import Chance from "chance";
import { renderHook, act } from "@testing-library/react-hooks";

const chance = Chance();

afterEach(fetch.resetMocks);

test("should make correct fetch call and return correct point balance", async () => {
   const expectedPoints = chance.integer();
   fetch.mockResponse(JSON.stringify(expectedPoints));

   const { result, waitFor } = renderHook(() => usePoints(0));

   await expect(fetch).toBeCalledWith("http://localhost:4001/pointBalance/personId=0");
   await waitFor(() => expect(result.current.pointBalance).toBe(expectedPoints));
});

test("incrementPointBalance should make correct api post and return correct point balance", async () => {
   const expectedStartingPoints = chance.integer();
   const expectedAfterPoints = chance.integer();
   fetch
      .mockResponseOnce(JSON.stringify(expectedStartingPoints))
      .mockResponseOnce(JSON.stringify(expectedAfterPoints));
   const { result, waitFor } = renderHook(() => usePoints(0));
   await waitFor(() => expect(result.current.pointBalance).toBe(expectedStartingPoints));

   act(() => result.current.incrementPointBalance());

   await waitFor(() => expect(fetch.mock.calls.length).toBe(2));
   expect(fetch.mock.calls[1]).toEqual([
      "http://localhost:4001/pointBalance/increment/personId=0",
      {
         method: "POST"
      }
   ]);
   await waitFor(() => expect(result.current.pointBalance).toBe(expectedAfterPoints));
});

test("decrementPointBalance should make correct api post and return correct point balance", async () => {
   const expectedStartingPoints = chance.integer();
   const expectedAfterPoints = chance.integer();
   fetch
      .mockResponseOnce(JSON.stringify(expectedStartingPoints))
      .mockResponseOnce(JSON.stringify(expectedAfterPoints));
   const { result, waitFor } = renderHook(() => usePoints(0));
   await waitFor(() => expect(result.current.pointBalance).toBe(expectedStartingPoints));

   act(() => result.current.decrementPointBalance());

   await waitFor(() => expect(fetch.mock.calls.length).toBe(2));
   expect(fetch.mock.calls[1]).toEqual([
      "http://localhost:4001/pointBalance/decrement/personId=0",
      {
         method: "POST"
      }
   ]);
   await waitFor(() => expect(result.current.pointBalance).toBe(expectedAfterPoints));
});
