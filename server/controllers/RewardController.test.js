import {
	rewardController,
	claimRewardController,
	unClaimRewardController,
} from './RewardController';
import { allRewards } from '../../database/test/seeds/001-reward';
import { db } from '../../database/db-config';
import { jest, expect, beforeAll, afterAll, afterEach, describe, test } from '@jest/globals';
import { createResponse, createRequest } from 'node-mocks-http';

beforeAll(async () => {
	await db.migrate.latest();
	await db.seed.run();
});

afterEach(jest.restoreAllMocks);

afterAll(async () => {
	db.destroy();
});

describe('rewardController', () => {
	test.each([
		[
			15,
			197,
			[
				{
					PersonId: 15,
					RewardId: 64,
					Money: 1,
					Description: 'Funny Money',
					Quantity: 7,
					Points: 32,
					IconPath: './resources/Icons/funny.png',
				},
			],
		],
		[
			82,
			34,
			[
				{
					PersonId: 82,
					RewardId: 29,
					Money: 0,
					Description: 'Cool Thing',
					Quantity: 1,
					Points: 92,
					IconPath: './resources/Icons/cool.png',
				},
			],
		],
	])(
		'when request is received for a specific person id should return 200 with result',
		async (id, pointBalance, claimedRewards) => {
			const response = createResponse();
			const request = createRequest();
			request.params.personId = id;
			const availableRewards = allRewards;

			await rewardController(request, response);

			expect(response._getStatusCode()).toBe(200);
			expect(response._getJSONData()).toEqual({
				pointBalance,
				availableRewards,
				claimedRewards,
				personFound: true,
				success: true,
			});
		},
	);

	test('when there is no matching person should return 200 with apppropriate response', async () => {
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await rewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance: null,
			availableRewards: null,
			claimedRewards: null,
			personFound: false,
			success: false,
		});
	});

	test('when database throws error should return 500 with message', async () => {
		jest.spyOn(db.context, 'queryBuilder').mockImplementation(() => {
			throw new Error();
		});
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await rewardController(request, response);

		expect(response._getStatusCode()).toBe(500);
		expect(response._getJSONData().error).toMatch(
			/error retrieving reward status for person with id '0'/i,
		);
	});
});

describe('claimRewardController', () => {
	test(`given person does not have enough points
              should return 200 with non-updated reward status`, async () => {
		const personId = 82;
		const response = createResponse();
		const request = createRequest();
		request.params.personId = personId;
		request.params.rewardId = 29;
		const pointBalance = 34;
		const availableRewards = allRewards;
		const claimedRewards = [
			{
				PersonId: 82,
				RewardId: 29,
				Money: 0,
				Description: 'Cool Thing',
				Quantity: 1,
				Points: 92,
				IconPath: './resources/Icons/cool.png',
			},
		];

		await claimRewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance,
			availableRewards,
			claimedRewards,
			personFound: true,
			success: false,
		});
	});

	test.each([
		[
			15,
			29,
			105,
			[
				{
					PersonId: 15,
					RewardId: 64,
					Money: 1,
					Description: 'Funny Money',
					Quantity: 7,
					Points: 32,
					IconPath: './resources/Icons/funny.png',
				},
				{
					PersonId: 15,
					RewardId: 29,
					Money: 0,
					Description: 'Cool Thing',
					Quantity: 1,
					Points: 92,
					IconPath: './resources/Icons/cool.png',
				},
			],
		],
		[
			82,
			64,
			2,
			[
				{
					PersonId: 82,
					RewardId: 29,
					Money: 0,
					Description: 'Cool Thing',
					Quantity: 1,
					Points: 92,
					IconPath: './resources/Icons/cool.png',
				},
				{
					PersonId: 82,
					RewardId: 64,
					Money: 1,
					Description: 'Funny Money',
					Quantity: 7,
					Points: 32,
					IconPath: './resources/Icons/funny.png',
				},
			],
		],
	])(
		`given person does not have a certain reward
         when request is received to claim that reward
         should return 200 with points deducted and new claimed reward added`,
		async (id, rewardId, pointBalance, claimedRewards) => {
			const response = createResponse();
			const request = createRequest();
			request.params.personId = id;
			request.params.rewardId = rewardId;
			const availableRewards = allRewards;

			await claimRewardController(request, response);

			expect(response._getStatusCode()).toBe(200);
			expect(response._getJSONData()).toEqual({
				pointBalance,
				availableRewards,
				claimedRewards,
				personFound: true,
				success: true,
			});
		},
	);

	test(`given person already has certain reward
   when request is received to claim that reward again
   should return 200 with points deducted and reward values increased`, async () => {
		const personId = 15;
		const response = createResponse();
		const request = createRequest();
		request.params.personId = personId;
		request.params.rewardId = 29;
		const availableRewards = allRewards;
		const pointBalance = 105 - 92;
		const claimedRewards = [
			{
				PersonId: 15,
				RewardId: 64,
				Money: 1,
				Description: 'Funny Money',
				Quantity: 7,
				Points: 32,
				IconPath: './resources/Icons/funny.png',
			},
			{
				PersonId: 15,
				RewardId: 29,
				Money: 0,
				Description: 'Cool Thing',
				Quantity: 2,
				Points: 184,
				IconPath: './resources/Icons/cool.png',
			},
		];

		await claimRewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance,
			availableRewards,
			claimedRewards,
			personFound: true,
			success: true,
		});
	});

	test('when there is no matching person should return 200 with appropriate response', async () => {
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await claimRewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance: null,
			availableRewards: null,
			claimedRewards: null,
			personFound: false,
			success: false,
		});
	});

	test('when there is no matching reward should return 200 with appropriate response', async () => {
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 15;
		request.params.rewardId = 1000;
		const availableRewards = allRewards;
		const claimedRewards = [
			{
				PersonId: 15,
				RewardId: 64,
				Money: 1,
				Description: 'Funny Money',
				Quantity: 7,
				Points: 32,
				IconPath: './resources/Icons/funny.png',
			},
			{
				PersonId: 15,
				RewardId: 29,
				Money: 0,
				Description: 'Cool Thing',
				Quantity: 2,
				Points: 184,
				IconPath: './resources/Icons/cool.png',
			},
		];

		await claimRewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance: 13,
			availableRewards,
			claimedRewards,
			personFound: true,
			success: false,
		});
	});

	test('when database throws error should return 500 with message', async () => {
		jest.spyOn(db.context, 'queryBuilder').mockImplementation(() => {
			throw new Error();
		});
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 15;
		request.params.rewardId = 29;

		await claimRewardController(request, response);

		expect(response._getStatusCode()).toBe(500);
		expect(response._getJSONData().error).toMatch(/error claiming reward:/i);
	});
});

describe('unClaimRewardController', () => {
	test.each([
		[
			15,
			29,
			197,
			[
				{
					PersonId: 15,
					RewardId: 64,
					Money: 1,
					Description: 'Funny Money',
					Quantity: 7,
					Points: 32,
					IconPath: './resources/Icons/funny.png',
				},
			],
		],
		[
			82,
			64,
			34,
			[
				{
					PersonId: 82,
					RewardId: 29,
					Money: 0,
					Description: 'Cool Thing',
					Quantity: 1,
					Points: 92,
					IconPath: './resources/Icons/cool.png',
				},
			],
		],
	])(
		`Given person has a certain reward
    when that reward is unclaimed
    should return 200 with updated claimed rewards and updated points`,
		async (personId, rewardId, pointBalance, claimedRewards) => {
			const response = createResponse();
			const request = createRequest();
			request.params.personId = personId;
			request.params.rewardId = rewardId;
			const availableRewards = allRewards;

			await unClaimRewardController(request, response);

			expect(response._getStatusCode()).toBe(200);
			expect(response._getJSONData()).toEqual({
				pointBalance,
				availableRewards,
				claimedRewards,
				personFound: true,
				success: true,
			});
		},
	);

	test('when there is no matching person should return 200 with no account message', async () => {
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await unClaimRewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance: null,
			availableRewards: null,
			claimedRewards: null,
			personFound: false,
			success: false,
		});
	});

	test('when there is no matching reward for person should return 200 with reward not found message', async () => {
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 15;
		request.params.rewardId = 1000;
		const availableRewards = allRewards;
		const claimedRewards = [
			{
				PersonId: 15,
				RewardId: 64,
				Money: 1,
				Description: 'Funny Money',
				Quantity: 7,
				Points: 32,
				IconPath: './resources/Icons/funny.png',
			},
		];

		await unClaimRewardController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toEqual({
			pointBalance: 197,
			availableRewards,
			claimedRewards,
			personFound: true,
			success: false,
		});
	});

	test('when database throws error should return 500 with message', async () => {
		jest.spyOn(db.context, 'queryBuilder').mockImplementation(() => {
			throw new Error();
		});
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 15;
		request.params.rewardId = 29;

		await unClaimRewardController(request, response);

		expect(response._getStatusCode()).toBe(500);
		expect(response._getJSONData().error).toMatch(/error relinquishing reward:/i);
	});
});
