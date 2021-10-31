import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {

  let appController: AppController;

  const mockAppService = {
    healthcheck: jest.fn().mockReturnValue({
      buildNum: 'LOCAL',
      status: 'ACTIVE',
      dbConnection: true,
      message: 'test'
    })
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService.name, useValue: mockAppService }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('App Controller', () => {

    it('should return a healthcheck object', () => {
      expect(appController.healthcheck()).toBeDefined();
    });

  });

});
