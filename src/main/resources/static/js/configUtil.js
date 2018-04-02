var configUtil = {
  currentUser: null,
  
  isAdmin: function() {
      if(this.currentUser && this.currentUser.role === 'ROLE_ADMIN') {
          return true;
      }
      return false;
  },
  
  getUserId: function() {
      return this.currentUser.id;
  },

  register: function() {
      return "/user";
  },

  getCurrentUser: function() {
      return "/user";
  },

  getUsers: function() {
      return "/users";
  },

  getUserByName: function(name) {
      return '/user/' + name;
  },

  modifyUserById: function(id) {
      return '/user/' + id ;
  },

  deleteUser: function(id) {
      return '/user/' + id ;
  },

  getDevices: function() {
      return "/devices";
  },
  
  addDevice: function() {
      return "/device";
  },

  getDevice: function(id) {
      return '/device/' + id;
  },

  deleteDevice: function(id) {
      return '/device/' + id;
  },
  
  modifyDevice: function(id) {
      return '/device/' + id;
  },
  login: function(id) {
      return "login.html";
  },
  
  addScenario: function() {
      return "/scenario";
  },

  getScenarios: function() {
      return "/scenarios";      
  },

  modifyScenario: function(id) {
      return '/scenario/' + id;
  },

  deleteScenario: function(id) {
      return '/scenario/' + id;
  },

  getScenarioById: function(id) {
      return '/scenario/' + id;
  },

  getScenarioFile: function(scenarioId, deviceId) {
      if(deviceId) {
          return '/files/' + scenarioId + '?includeState=true&deviceId=' + deviceId;
      }
      return '/files/' + scenarioId + '?includeState=false';
  },

  uploadFile: function() {
      return '/file';
  },

  deleteFile: function(deviceId, scenarioId) {
      return '/files/' + deviceId + '?scenarioid=' + scenarioId;
  },

  addTest: function() {
      return "/test";
  },

  getTests: function() {
      return "/tests";
  },

  getTestById: function(id) {
      return '/test/' + id;
  },
  
  deleteTest: function(id) {
      return '/test/' + id;
  },

  cancelTest: function(id) {
      return '/stop/' + id
  },

  adjustTest: function(id) {
      return '/adjust/' + id;
  },

  logout: function() {
      return '/logout';
  },

  getCurrentDownloadedFile: function(agentId) {
      return '/currentfile/' + agentId;
  },

  downloadTestFile: function(deviceId) {
      return '/download/' + deviceId;
  },

  checkDownloading: function(agentId) {
      return '/currentfile/' + agentId;
  },
  
  checkDownloadQueue: function() {
      return '/downloadsequence';
  },

  checkTestProcess: function(agentId) {
      return '/realtime/' + agentId;
  },

  checkTestReport: function(testId) {
      return '/report/' + testId;
  },

  getVmList: function() {
      return '/vms';
  },
  createVM: function() {
      return '/vm';
  },
  modifyVM: function(vmId) {
      return '/vm/' + vmId;
  },
  deleteVM: function(vmId) {
      return '/vm/' + vmId;
  },
  getVMById: function(vmId) {
      return '/vm/' + vmId;
  },
  getGGA: function(agentId) {
      return '/gga/' + agentId;
  },
  cancelDownloading: function(deviceId) {
      return '/download/' + deviceId;
  },
  getReadyScenarios: function(deviceId) {
      return '/scenarios/' + deviceId;
  },
  getRFDeviceById: function(deviceId) {
      return '/RFDevice/' + deviceId;
  },
  getRFDevices: function() {
      return '/RFDevices';
  },
  addRFDevice: function() {
      return '/RFDevice';
  },
  resetPwd: function() {
      return '/mailto';
  },
  downloadReport: function(testId) {
      return '/reportdata/' + testId;
  }
}