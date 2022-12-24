import {
	pointController,
	incrementPointsController,
	decrementPointsController,
} from './PointController';
import { allPoints } from '../../database/test/seeds/001-pointBank';
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

describe('pointController', () => {
	test.each([15, 82])(
		'when request is received for a specific person id should return 200 with result',
		async (id) => {
			const response = createResponse();
			const request = createRequest();
			request.params.personId = id;
			const expectedPoints = allPoints.filter((points) => points.PersonId === id)[0].Balance;

			await pointController(request, response);

			expect(response._getStatusCode()).toBe(200);
			expect(response._getJSONData()).toEqual(expectedPoints);
		},
	);

	test('when there is no matching person should return 200 with no account message', async () => {
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await pointController(request, response);

		expect(response._getStatusCode()).toBe(200);
		expect(response._getJSONData()).toMatch(/no account/i);
	});

	test('when database throws error should return 500 with message', async () => {
		jest.spyOn(db.context, 'queryBuilder').mockImplementation(() => {
			throw new Error();
		});
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await pointController(request, response);

		expect(response._getStatusCode()).toBe(500);
		expect(response._getJSONData().error).toMatch(
			/error retrieving balance for person with id '0'/i,
		);
	});
});

describe('incrementPointsController', () => {
	test.each([15, 82])(
		'when request is received for a specific person id should return 200 with their point balance incremented by one',
		async (id) => {
			const response = createResponse();
			const request = createRequest();
			request.params.personId = id;
			let expectedPoints = allPoints.filter((points) => points.PersonId === id)[0].Balance;
			expectedPoints++;

			await incrementPointsController(request, response);

			expect(response._getStatusCode()).toBe(200);
			expect(response._getJSONData()).toEqual(expectedPoints);
		},
	);

	test('when database throws error should return 500 with message', async () => {
		jest.spyOn(db.context, 'queryBuilder').mockImplementation(() => {
			throw new Error();
		});
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await incrementPointsController(request, response);

		expect(response._getStatusCode()).toBe(500);
		expect(response._getJSONData().error).toMatch(
			/error incrementing point balance for person with id '0'/i,
		);
	});
});

describe('decrementPointsController', () => {
	test.each([15, 82])(
		'when request is received for a specific person id should return 200 with their point balance decremented by one',
		async (id) => {
			const response = createResponse();
			const request = createRequest();
			request.params.personId = id;
			let expectedPoints = allPoints.filter((points) => points.PersonId === id)[0].Balance;

			await decrementPointsController(request, response);

			expect(response._getStatusCode()).toBe(200);
			expect(response._getJSONData()).toEqual(expectedPoints);
		},
	);

	test('when database throws error should return 500 with message', async () => {
		jest.spyOn(db.context, 'queryBuilder').mockImplementation(() => {
			throw new Error();
		});
		const response = createResponse();
		const request = createRequest();
		request.params.personId = 0;

		await decrementPointsController(request, response);

		expect(response._getStatusCode()).toBe(500);
		expect(response._getJSONData().error).toMatch(
			/error incrementing point balance for person with id '0'/i,
		);
	});
});
