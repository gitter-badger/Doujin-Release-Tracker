'use strict';

describe('Controller: IndexCtrl', function () {

  var IndexCtrl, scope, $rootScope, deferred, promise, EventsRepository, ReleasesRepository;

  beforeEach(function () {

    module('comiket');

    inject(function ($controller, _$rootScope_, $q) {
      $rootScope = _$rootScope_;

      deferred = $q.defer();
      promise = deferred.promise;
        
      EventsRepository = {
        getAll: jasmine.createSpy('EventsRepository.getAll()').and.callFake(function () {
          return promise;
        })
      };

      ReleasesRepository = {
        getById: jasmine.createSpy('ReleasesRepository.getById()').and.callFake(function () {
          return promise;
        })
      };
        
      scope = $rootScope.$new();
      IndexCtrl = $controller('IndexCtrl', {
        $scope: scope,
        EventsRepository: EventsRepository,
        ReleasesRepository: ReleasesRepository
      });
    });
  });
    
  it('should be the newest comiket', function () {
    expect(scope.comiketId).toBe(86);
  });

  it('should attach init data to scope', function () {
    var data = [1,2,3,4]
    deferred.resolve(data);
    $rootScope.$digest();
    expect(scope.releases).toBe(data);
  });
    
  it('should order by artist/circle descending', function () {
    expect(scope.order).toBe('artistcircle');
    expect(scope.orderBy).toBe('false');
  });
});