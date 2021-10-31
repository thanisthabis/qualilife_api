import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER } from "../../constants/error.message";

describe('UserController', () => {
  let controller: UserController;

  const mockUserArr = [
    {
      _id: "1", firstName: 'Name', lastName: 'LastName', email: 'test@test.com', position: {name: "Position Name", level: 1},
    },
    {
      _id: "2", firstName: 'Name2', lastName: 'LastName2', email: 'test2@test.com', position: {name: "Position Name", level: 2},
    }
  ];

  const mockUserService = {
    getAll: jest.fn((userId: string) => {
      return Promise.resolve(mockUserArr.find(e => e));
    }),

    getById: jest.fn((userId: string) => {
      return Promise.resolve(mockUserArr.find(e => e._id == userId));
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService.name, useValue: mockUserService }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // getDeviceById
  // Happy path
  it('should return some user given', async () => {
    const resp = await controller.getById('1');
    expect(resp.data).toBeGreaterThan(0);
  });

  it('should throw exception when user is null or undefind', async () => {
    try {
      await controller.getById(null);
      fail('should reach this line');
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof HttpException)
        expect(error.getStatus()).toBe(HttpStatus.PRECONDITION_FAILED);
    }
  })

  it('should throw exception when get user is error', async () => {
    // Mock throwing exception once
    mockUserService.getById.mockRejectedValueOnce(new USER.FIND_BY_ID, HttpStatus.INTERNAL_SERVER_ERROR));
    try {
      await controller.getById('1');
      fail('should reach this line');
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof HttpException)
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should throw exception when data return by get user not found ', async () => {
    // Mock resolve nothing
    mockUserService.getById.mockResolvedValueOnce(null);
    try {
      await controller.getById('1');
      fail('should reach this line');
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof HttpException)
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  })


});
