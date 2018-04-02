
var string = languages[0].content;
var mockData = {
  getDevicefields: function() {
      var obj = {
          name: string.DEVICE_NAME.LABEL,
          date: string.REGISTER_TIME,
      }
      if(configUtil.isAdmin()) {
          obj.owner = string.DEVICE_OWNER;
      }
      obj.check = string.CHECK;
      if(!configUtil.isAdmin()) {
          obj.modify = string.MODIFY;
      }
      obj.delete = string.DELETE;
      return obj;
  },
  
  getRFDevicefields: function() {
      var obj = {
          id: string.DEVICE_NUMBER.LABEL,
          date: string.REGISTER_TIME,
      }
      if(configUtil.isAdmin()) {
          obj.owner = string.DEVICE_OWNER;
      }
      if(!configUtil.isAdmin()) {
          obj.modify = string.MODIFY;
      }
      obj.delete = string.DELETE;
      return obj;
  },

  downloadScenarioFile: function() {
    var obj = {
        scenarioType: string.SCENARIO_FREE.LABEL,
        scenarioName: string.SCENARIO_NAME.LABEL,
        scenarioDescp: string.SCENARIO_DESCRIPTION.LABEL,
        frequencyPointType: string.FREQUENCY_POINT + " / " + string.DOWNLOAD_STATUS,
        action: string.DETAIL
    }
    return obj;
  },

  getTestFileFields: function() {
     var obj = {
         fileName: string.TEST_FILE_NAME,
         frequencyPointType: string.FREQUENCY_POINT,
         size: string.FIlE_SIZE
     }
     return obj;
  },

  getTestSubmitTable: function() {
       var obj = {
          free: string.SCENARIO_FREE.LABEL,
          name: string.SCENARIO_NAME.LABEL,
          sampleBit: string.SAMPLE_BIT.LABEL,
          sampleRate: string.SAMPLE_RATE.LABEL,
          frequencyPointType: string.FREQUENCY_POINT + "  /  " + string.IF_READY_TO_TEST,
      };
      return obj;
  },

  getTestRecordsFeilds: function(opts){
      var obj = {};
      obj.deviceName = string.END_DEVICE;
      obj.RFDevice = string.RF_DEVICE;
      obj.scenarioName = string.SCENARIO_NAME.LABEL;
      obj.playTime = string.PLAY_TIME + " / " + string.MUNITE;
      if(configUtil.isAdmin()) {
         obj.user = string.TEST_OWNER;
      }
      obj.startTime = string.DATE_START;
      obj.endTime = string.DATE_END;
      obj.state = string.TEST_STATE;
      obj.report = string.ACTION;
      obj.delete = string.DELETE;
      return obj;
  },

  getUserfields: function() {
      var obj = {
          name: string.USER.ACCOUNT,
          email: string.EMAIL.EMAIL,
          userType: string.USER_TYPE,
          type: string.ROLE.ROLE,
          check: string.CHECK,
          modify: string.MODIFY,
          delete: string.DELETE
      };
      return obj; 
  },
  
  getScenariofields: function() {
      var obj = {
          name: string.SCENARIO_NAME.LABEL,
          description: string.SCENARIO_DESCRIPTION.LABEL,
          free: string.SCENARIO_FREE.LABEL,
          sampleBit: string.SAMPLE_BIT.LABEL,
          sampleRate: string.SAMPLE_RATE.LABEL,
          minutes: string.PLAY_TIME + " / " + string.MUNITE
      };
      if(configUtil.isAdmin()) {
          obj.dateCreated = string.DATE_CREATED,
          obj.check = string.CHECK_FILE
          obj.modify = string.MODIFY;
          obj.delete = string.DELETE;
      } else {
          obj.select = string.SELECT;
      }
      return obj;
  },

  LoginForm: {
      user: {
         label: string.USER.ACCOUNT,
         input: {
             placeholder: string.USER.INPUT_ACCOUNT,
             name: "username",
             type: "text"
         },
         span: {
             id: "userEmpty",
             label: string.USER.EMPTY_USER
         },
         must: true
     },
     password: {
         label: string.PASSWORD.PASSWORD,
         input: {
             placeholder: string.PASSWORD.INPUT_PASSWORD,
             name: "password",
             type: "password"
         },
         span: {
             id: "pwdEmpty",
             label: string.PASSWORD.EMPTY_PASSWORD
         },
         must: true
     },
  },

  resetForm: {
      user: {
         label: string.USER.ACCOUNT,
         input: {
             placeholder: string.USER.INPUT_ACCOUNT,
             name: "username",
             type: "text"
         },
         span: {
             id: "userEmpty",
             label: string.USER.EMPTY_USER
         },
         must: true
     },
     email: {
         label: string.EMAIL.EMAIL,
         input: {
             placeholder: string.EMAIL.INPUT_EMAIL,
             name: "mailaddress",
             type: "email"
         },
         span: {
             id: "emailEmpty",
             label: string.EMAIL.EMPTY_EMAIL
         },
         must: true
     },
  },

 changePasswordForm: function() {
      var obj = {
          password: {
            label: string.NEW_PASSWORD.LABEL,
            input: {
                placeholder: string.NEW_PASSWORD.INPUT_PASSWORD,
                name: "password",
                type: "password"
            },
            span: {
                id: "pwdEmpty",
                label: string.PASSWORD.EMPTY_PASSWORD
            },
            must: true
        },
        confirmpassword: {
            label: string.CONFIRM_PASSWORD.CONFIRM_PASSWORD,
            input: {
                placeholder: string.CONFIRM_PASSWORD.INPUT_PASSWORD_CONFIRM,
                name: "confPassword",
                type: "password"
            },
            span: {
                id: "pwdConfirmEmpty",
                label: string.CONFIRM_PASSWORD.EMPTY_CONFIRM_PASSWORD
            },
            must: true
        },
      }
    return obj;
 },

 getRegisterForm: function(opts) {
     var obj;
     if(opts.phase === 1) {
         obj = {
            user: {
                label: string.USER.ACCOUNT,
                input: {
                    placeholder: string.USER.INPUT_ACCOUNT,
                    name: "name",
                    type: "text"
                },
                span: {
                    id: "userEmpty",
                    label: string.USER.EMPTY_USER
                },
                must: true
            },
            password: {
                label: string.PASSWORD.PASSWORD,
                input: {
                    placeholder: string.PASSWORD.INPUT_PASSWORD,
                    name: "password",
                    type: "password"
                },
                span: {
                    id: "pwdEmpty",
                    label: string.PASSWORD.EMPTY_PASSWORD
                },
                must: true
            },
            confirmpassword: {
                label: string.CONFIRM_PASSWORD.CONFIRM_PASSWORD,
                input: {
                    placeholder: string.CONFIRM_PASSWORD.INPUT_PASSWORD_CONFIRM,
                    name: "confPassword",
                    type: "password"
                },
                span: {
                    id: "pwdConfirmEmpty",
                    label: string.CONFIRM_PASSWORD.EMPTY_CONFIRM_PASSWORD
                },
                must: true
            }
        }
     } else if(opts.phase === 2) {
         obj = {
             email: {
                label: string.EMAIL.EMAIL,
                input: {
                    placeholder: string.EMAIL.INPUT_EMAIL,
                    name: "email",
                    type: "email"
                },
                span: {
                    id: "emptyEmail",
                    label: string.EMAIL.EMPTY_EMAIL
                },
                must: true
            },
            phone: {
                label: string.PHONE.PHONE_NUMBER,
                input: {
                    placeholder: string.PHONE.INPUT_PHONE_NUMBER,
                    name: "phoneNumber",
                    type: "text"
                }
            },
            fax: {
                label: string.FAX.FAX_NUMBER,
                input: {
                    placeholder: string.FAX.INPUT_FAX_NUMBER,
                    name: "faxNumber",
                    type: "text"
                }
            },
            employer: {
                label: string.EMPLOYER.EMPLOYER,
                input: {
                    placeholder: string.EMPLOYER.INPUT_EMPLOYER,
                    name: "employer",
                    type: "text"
                }
            },
            address: {
                label: string.ADDRESS.ADDRESS,
                input: {
                    placeholder: string.ADDRESS.INPUT_ADDRESS,
                    name: "address",
                    type: "text"
                }
            },
            contactor: {
                label: string.CONTACTOR.CONTACTOR,
                input: {
                    placeholder: string.CONTACTOR.INPUT_CONTACTOR,
                    name: "contact",
                    type: "text"
                }
            }
         }
     }
     return obj;
 },

 getUserForm: function(opts) {
     var opt = opts || {};
     var obj = {
        user: {
            must: true,
            label: string.USER.ACCOUNT,
            input: {
                placeholder: string.USER.INPUT_ACCOUNT,
                name: "name",
                type: "text"
            },
            
            span: {
                id: "userEmpty",
                label: string.USER.EMPTY_USER
            }
            
        },
        password: {
            must: true,
            label: string.PASSWORD.PASSWORD,
            input: {
                placeholder: string.PASSWORD.INPUT_PASSWORD,
                name: "password",
                type: "password"
            },
            
            span: {
                id: "pwdEmpty",
                label: string.PASSWORD.EMPTY_PASSWORD
            },
            
        },
        confirmpassword: {
            must: true,
            label: string.CONFIRM_PASSWORD.CONFIRM_PASSWORD,
            input: {
                placeholder: string.CONFIRM_PASSWORD.INPUT_PASSWORD_CONFIRM,
                name: "confPassword",
                type: "password"
            },
            
            span: {
                id: "pwdConfirmEmpty",
                label: string.CONFIRM_PASSWORD.EMPTY_CONFIRM_PASSWORD
            },
            
        },
        email: {
            must: true,
            label: string.EMAIL.EMAIL,
            input: {
                placeholder: string.EMAIL.INPUT_EMAIL,
                name: "email",
                type: "email"
            },
            
            span: {
                id: "emptyEmail",
                label: string.EMAIL.EMPTY_EMAIL
            },
            
        },
        phone: {
            label: string.PHONE.PHONE_NUMBER,
            input: {
                placeholder: string.PHONE.INPUT_PHONE_NUMBER,
                name: "phoneNumber",
                type: "text"
            }
        },
        fax: {
            label: string.FAX.FAX_NUMBER,
            input: {
                placeholder: string.FAX.INPUT_FAX_NUMBER,
                name: "faxNumber",
                type: "text"
            }
        },
        employer: {
            label: string.EMPLOYER.EMPLOYER,
            input: {
                placeholder: string.EMPLOYER.INPUT_EMPLOYER,
                name: "employer",
                type: "text"
            }
        },
        address: {
            label: string.ADDRESS.ADDRESS,
            input: {
                placeholder: string.ADDRESS.INPUT_ADDRESS,
                name: "address",
                type: "text"
            }
        },
        contactor: {
            label: string.CONTACTOR.CONTACTOR,
            input: {
                placeholder: string.CONTACTOR.INPUT_CONTACTOR,
                name: "contact",
                type: "text"
            }
        },
        license: {
            label: string.USER_TYPE,
            select: {
                name: "license",
                options: [
                    {
                        value: 0,
                        label: string.USER_NO_VIP
                    },
                    {
                        value: 1,
                        label: string.USER_VIP
                    }
                ]
            }
        },
        role: {
            label: string.ROLE.ROLE,
            select: {
                name: "role",
                options: [
                    {
                        value: 1,
                        label: string.ROLE.USER
                    },
                    {
                        value: 0,
                        label: string.ROLE.ADMIN
                    }
                ]
            }
        }
     }

     if(opt.isUpdate) {
         delete obj.password;
         delete obj.confirmpassword;
     }

     if(!opt.showRole) {
         delete obj.role;
         delete obj.license;
     }
     
     return obj;
 },

 AddRFDeviceForm: {
    seriesNumber: {
         must: true,
         label: string.DEVICE_NUMBER.LABEL,
         input: {
             placeholder: string.DEVICE_NUMBER.PLACEHOLDER,
             name: "rfId",
             type: "text"
         },
     },
 },

  AddDeviceForm: {
     device: {
         must: true,
         label: string.DEVICE_NAME.LABEL,
         input: {
             placeholder: string.DEVICE_NAME.PLACEHOLDER,
             name: "name",
             type: "text"
         }, 
        /*
         span: {
             id: "deviceEmpty",
             label: string.DEVICE_NAME.EMPTY
         },
         must: true
         */
     },
        /*
     seriesNumber: {
         must: true,
         label: string.DEVICE_NUMBER.LABEL,
         input: {
             placeholder: string.DEVICE_NUMBER.PLACEHOLDER,
             name: "seriesNumber",
             type: "text"
         },
     },
        */
     model: {
         label: string.DEVICE_MODEL.LABEL,
         input: {
             placeholder: string.DEVICE_MODEL.PLACEHOLDER,
             name: "model",
             type: "text"
         }
     },
    tradeName: {
         label: string.DEVICE_TRADENAME.LABEL,
         input: {
             placeholder: string.DEVICE_TRADENAME.PLACEHOLDER,
             name: "tradeName",
             type: "text"
         },
     },
    brand: {
         label: string.DEVICE_BRAND.LABEL,
         input: {
             placeholder: string.DEVICE_BRAND.PLACEHOLDER,
             name: "brand",
             type: "text"
         }
     },
     hardwareVersion: {
         label: string.DEVICE_HARDWARE.LABEL,
         input: {
             placeholder: string.DEVICE_HARDWARE.PLACEHOLDER,
             name: "hardwareVersion",
             type: "text"
         }
     },
     softwareVersion: {
         label: string.DEVICE_SOFTWARE.LABEL,
         input: {
             placeholder: string.DEVICE_SOFTWARE.PLACEHOLDER,
             name: "softwareVersion",
             type: "text"
         }
     },
     type: {
         label: string.DEVICE_TYPE.LABEL,
         select: {
            name: "type",
            options: [
                {
                    value: 0,
                    label: string.DEVICE_TYPE.TYPE_1
                },
                {
                    value: 1,
                    label: string.DEVICE_TYPE.TYPE_2
                }
            ]
        }
     },
    workMode: {
        label: string.DEVICE_WORK_MODE.LABEL,
        input: {
            placeholder: string.DEVICE_WORK_MODE.PLACEHOLDER,
            name: "workMode",
            type: "text"
        }
    },
    checkVersion: {
        label: string.DEVICE_CHECK_VERSION.LABEL,
        input: {
            placeholder: string.DEVICE_CHECK_VERSION.PLACEHOLDER,
            name: "checkVersion",
            type: "text"
        }
    },
    antennaGain: {
        label: string.DEVICE_ANTENNA_GAIN.LABEL,
        input: {
            placeholder: string.DEVICE_ANTENNA_GAIN.PLACEHOLDER,
            name: "antennaGain",
            type: "text"
        }
    },
    manufacturer: {
        label: string.DEVICE_MANUFACTURER.LABEL,
        input: {
             placeholder: string.DEVICE_MANUFACTURER.PLACEHOLDER,
             name: "manufacturer",
             type: "text"
         }
    },
     antenna_title: {
         title: string.DEVICE_ANTENNA.LABEL
     },
     antenna: {
    	antennaType: {
            select: {
                name: "antennaType",
                options: [
                    {
                        value: 0,
                        label: string.DEVICE_ANTENNA.TYPE_1
                    },
                    {
                        value: 1,
                        label: string.DEVICE_ANTENNA.TYPE_2
                    }
                ]
            }
         },
        autoTransform: {
            input: {
                 name: "autoTransform",
                 type: "checkbox",
                 label: string.DEVICE_AUTO_TRANSFORM.LABEL
            }
        }
     },
    head_micro_phone_title: {
        title: string.DEVICE_HEAD_MICRO_PHONE.LABEL,
    },
    head_micro_phone: {
        headphoneType: {
            input: {
                name: "headphoneType",
                type: "checkbox",
                label: string.DEVICE_HEADPHONE_TYPE.LABEL
            }
        },
        microphoneType: {
            input: {
                name: "microphoneType",
                type: "checkbox",
                label: string.DEVICE_MICROPHONE_TYPE.LABEL
            },
        }
    },
    chip_title: {
        title: string.DEVICE_CHIP.LABEL,
    },
    chip: {
        chipVender: {
            label: string.DEVICE_CHIP_VENDER.LABEL,
            input: {
                placeholder: string.DEVICE_CHIP_VENDER.PLACEHOLDER,
                name: "chipVender",
                type: "text"
            }
        },
        radioFrequency: {
            label: string.DEVICE_RADIO_FREQUENCY.LABEL,
            select: {        
                name: "radioFrequency",
                options: {
	    	        	    min: 0,
	    	        	    max: 99,
	    	        	    unit: " HZ"
	    	        }
            }
        },
        baseband: {
            label: string.DEVICE_BASEBAND.LABEL,
            select: {
                name: "baseband",
                options: {
		        	    min: 0,
		        	    max: 99,
		        	    unit: " HZ"
		        }
            }
        }
    },
    os_title: {
        title: string.DEVICE_OS_TITLE,
    },
    os: {
    	osType: {
            label: string.DEVICE_OS.LABEL,
            select: {
                name: "os",
                options: [
                    {
                        value: 0,
                        label: string.DEVICE_OS.TYPE_1
                    },
                    {
                        value: 1,
                        label: string.DEVICE_OS.TYPE_2
                    }
                ]
            }
        },
        osVersion: {
            label: string.DEVICE_OS_VERSION.LABEL,
            input: {
                placeholder: string.DEVICE_OS_VERSION.PLACEHOLDER,
                name: "osVersion",
                type: "text"
            }
        },
    },
    voltage_title: {
        title: string.DEVICE_VOLTAGE.LABEL
    },
    voltage: {
        minimunVoltage: {
            label: string.DEVICE_MINIMUN_VOLTAGE.LABEL,
            select: {
                name: "minimunVoltage",
                options: {
                        min: 0,
                        max: 999,
                        unit: " V"
                }
            }
        },
        normalVoltage: {
            label: string.DEVICE_NORMAL_VOLTAGE.LABEL,
            select: { 
                name: "normalVoltage",
                options: {
	    	        	    min: 0,
	    	        	    max: 999,
	    	        	    unit: " V"
	    	        }
            }
        },
        maximunVoltage: {
            label: string.DEVICE_MAXIMUN_VOLTAGE.LABEL,
            select: {
                name: "maximunVoltage",
                options: {
                    min: 0,
                    max: 999,
                    unit: " V"
                }
            }
        },
    },
    temperature_title: {
        title: string.DEVICE_TEMPERATURE.LABEL,
    },
    temperature: {
        minimunTemperature: {
            label: string.DEVICE_MINIMUN_TEMPERATURE.LABEL,
            select: {
                name: "minimunTemperature",
                options: {
	    	        	    min: 0,
	    	        	    max: 99,
	    	        	    unit: " C"
	    	        }
            }
        },
        maximunTemperature: {
            label: string.DEVICE_MAXIMUN_TEMPERATURE.LABEL,
            select: {
                name: "maximunTemperature",
                options: {
                	    min: 0,
                	    max: 99,
                	    unit: " C"
                }
            }
        },
    },
    power_title: {
        title: string.DEVICE_POWER.LABEL,
    },
    power: {  
        powerType: {
            select: {
                name: "powerType",
                options: [
                    {
                        value: 0,
                        label: string.DEVICE_POWER.TYPE_1
                    },
                    {
                        value: 1,
                        label: string.DEVICE_POWER.TYPE_2
                    }
                ]
            }
        },
        buildinPower: {
            input: {
                 name: "buildinPower",
                 type: "checkbox",
                 label: string.DEVICE_BUILD_IN_POWER.LABEL
             },
        }
    },
    size_title: {
        title: string.DEVICE_SIZE.LABEL,
    },
    size: {
        length: {
            label: string.DEVICE_LENGTH.LABEL,
            input: {
                 placeholder: string.DEVICE_LENGTH.PLACEHOLDER,
                 name: "length",
                 type: "text"
             }
        },
        width: {
            label: string.DEVICE_WIDTH.LABEL,
            input: {
                 placeholder: string.DEVICE_WIDTH.PLACEHOLDER,
                 name: "width",
                 type: "text"
             }
        },
        height: {
            label: string.DEVICE_HEIGHT.LABEL,
            input: {
                 placeholder: string.DEVICE_HEIGHT.PLACEHOLDER,
                 name: "height",
                 type: "text"
             }
        },
    },
    contact_title: {
        title: string.CONTACT_INFORMATION
    },
    address: {
         label: string.ADDRESS.ADDRESS,
         input: {
             placeholder: string.ADDRESS.INPUT_ADDRESS,
             name: "address",
             type: "text"
         }
     },
     contactor: {
         label: string.CONTACTOR.CONTACTOR,
         input: {
             placeholder: string.CONTACTOR.INPUT_CONTACTOR,
             name: "contact",
             type: "text"
         }
     },
    email: {
         label: string.EMAIL.EMAIL,
         input: {
             placeholder: string.EMAIL.INPUT_EMAIL,
             name: "email",
             type: "email"
         }
     },
    phone: {
         label: string.PHONE.PHONE_NUMBER,
         input: {
             placeholder: string.PHONE.INPUT_PHONE_NUMBER,
             name: "phoneNumber",
             type: "text"
         }
     },
     fax: {
         label: string.FAX.FAX_NUMBER,
         input: {
             placeholder: string.FAX.INPUT_FAX_NUMBER,
             name: "faxNumber",
             type: "text"
         }
     },
 },

getScenarioForm: function(opts) {
    var obj = {
        scenario: {
            name: {
                must: true,
                label: string.SCENARIO_NAME.LABEL,
                input: {
                    placeholder: string.SCENARIO_NAME.PLACEHOLDER,
                    name: "name",
                    type: "text"
                }
            },
            free: {
                input: {
                    name: "free",
                    type: "checkbox",
                    label: string.SCENARIO_FREE.LABEL
                },
            },
            description: {
                label: string.SCENARIO_DESCRIPTION.LABEL,
                input: {
                    placeholder: string.SCENARIO_DESCRIPTION.PLACEHOLDER,
                    name: "description",
                    type: "text"
                },
            }
        },
        sampleInfo: {
            sampleBit: {
                must: true,
                label: string.SAMPLE_BIT.LABEL,
                input: {
                    placeholder: string.SAMPLE_BIT.PLACEHOLDER,
                    name: "sampleBit",
                    type: "number"
                }
            },
            sampleRate: {
                must: true,
                label: string.SAMPLE_RATE.LABEL,
                input: {
                    placeholder: string.SAMPLE_RATE.PLACEHOLDER,
                    name: "sampleRate",
                    type: "number"
                }
            }
        },
        judgeFile: {
            name: {
                must: true,
                label: string.JUDGE_FILE
            },
            input: {
                type: "file"
            }
        }
    }
    if(opts && opts.type === 'modify') {
        delete obj.judgeFile;
    }
    return obj;
 },
    VMFormTable: {
        ip: {
            must: true,
            label: string.VM_IP.LABEL,
            input: {
                placeholder: string.VM_IP.PLACEHOLDER,
                name: "ip",
                type: "text"
            }
        },
        cpu: {
            must: true,
            label: string.VM_CPU.LABEL,
            input: {
                placeholder: string.VM_CPU.PLACEHOLDER,
                name: "cpu",
                type: "text"
            }
        },
        memory: {
            must: true,
            label: string.VM_MEMERY.LABEL,
            input: {
                placeholder: string.VM_MEMERY.PLACEHOLDER,
                name: "memory",
                type: "text"
            }
        },
        hd: {
            must: true,
            label: string.VM_HARD_DISK.LABEL,
            input: {
                placeholder: string.VM_MEMERY.PLACEHOLDER,
                name: "hd",
                type: "text"
            }
        },
        state: {
            input: {
                name: "state",
                type: "checkbox",
                label: string.VM_STATE.LABEL
            }
        }
    },

    getFrequencyPoint: function(excludePoint) {
        var wholeValue = [1, 2, 3, 4];
        var options = [];
        var excludeValue = excludePoint || [];
        for(var i=0; i< wholeValue.length; i++) {
            if(excludePoint.indexOf(wholeValue[i]) < 0) {
                var value;
                switch(wholeValue[i]) {
                    case 2: value = 'BDB2'; break;
                    case 1: value = 'GPSL1&BDB1'; break;
                    case 3: value = 'BDB3'; break;
                    case 4: value = 'GNR2'; break;
                    case 5: value = 'GPSL2'; break;
                    case 6: value = 'GPSL5'; break;
                }
                options.push({
                    value: wholeValue[i],
                    label: value
                });
            }
        }
        
        var obj = {
            label: string.SELECT_FREQUENCY,
            select: {
                name: "frequencyPoint",
                options: options
            }
        }
        return obj;
    },

    getTestFile: function() {
        var obj = {
            name: string.FILE_NAME,
            frequencyPoint: string.FREQUENCY_POINT
        }
        return obj;
    },

    getVMfields: function() {
        var obj = {
            ip: string.IP_ADDRESS,
            cpu: string.CPU,
            memory: string.MEMORY,
            hd: string.HARD_DISK,
            state: string.STATE
        }
        if(configUtil.isAdmin()) {
            obj.modify = string.MODIFY,
            obj.delete = string.DELETE
        }
        return obj;
    },

    getSampleInfo: function() {
        var obj = {
            sampleBit: {
                must: true,
                label: string.SAMPLE_BIT.LABEL,
                input: {
                    placeholder: string.SAMPLE_BIT.PLACEHOLDER,
                    name: "sampleBit",
                    type: "number"
                }
            },
            sampleRate: {
                must: true,
                label: string.SAMPLE_RATE.LABEL,
                input: {
                    placeholder: string.SAMPLE_RATE.PLACEHOLDER,
                    name: "sampleRate",
                    type: "number"
                }
            },
        }
        return obj;
    }
}
/*
var rep = [
    {
        "id": "8a8096d25f3d0acf015f3d1bf5320000",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "running",
        "vm": null,
        "startTime": 1508558763000,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d5672f20000",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "running",
        "vm": null,
        "startTime": 1508562597000,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d56ed140001",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "approved",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d5d81a80002",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "approved",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d61576d0003",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "approved",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d61576d0003done",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "done",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d61576d0003failed",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "failed",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d61576d0003cancelled",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "cancelled",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d61576d0003generating",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "generating",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    },
    {
        "id": "8a8096d25f3d53cc015f3d61576d0003pending",
        "name": null,
        "scenarioName": "scenario_checkBox",
        "state": "pending",
        "vm": null,
        "startTime": null,
        "endTime": null,
        "user": {
            "id": "8a8096d25f3ce004015f3ce0dddd0002",
            "email": "test001@hotmail.com",
            "name": "test001",
            "password": "",
            "role": "ROLE_USER",
            "phoneNumber": "",
            "faxNumber": "",
            "employer": "",
            "address": "",
            "contact": "",
            "license": "FREE",
            "quota": 1,
            "changePwd": false,
            "dateCreated": 1508554891000
        },
        "device": {
            "id": "8a8096d25f3ce004015f3ce2bf7c0003",
            "user": {
                "id": "8a8096d25f3ce004015f3ce0dddd0002",
                "email": "test001@hotmail.com",
                "name": "test001",
                "password": "",
                "role": "ROLE_USER",
                "phoneNumber": "",
                "faxNumber": "",
                "employer": "",
                "address": "",
                "contact": "",
                "license": "FREE",
                "quota": 1,
                "changePwd": false,
                "dateCreated": 1508554891000
            },
            "name": "TLBL_GD",
            "model": "",
            "tradeName": "",
            "brand": "",
            "seriesNumber": "CRSP1004N1S117070011",
            "hardwareVersion": "",
            "softwareVersion": "",
            "type": "0",
            "antennaType": "0",
            "autoTransform": false,
            "headphoneType": "false",
            "microphoneType": "false",
            "chipVender": "",
            "radioFrequency": "0",
            "baseband": "0",
            "os": "0",
            "osVersion": "",
            "workMode": "",
            "checkVersion": "",
            "minimunVoltage": "0",
            "normalVoltage": "0",
            "maximunVoltage": "0",
            "minimunTemperature": "0",
            "maximunTemperature": "0",
            "powerType": "0",
            "length": 0,
            "width": 0,
            "height": 0,
            "antennaGain": "",
            "satelliteSystem": null,
            "manufacturer": "",
            "mfrAddress": null,
            "mfrContact": null,
            "mfrEmail": null,
            "mfrPhoneNumber": null,
            "mfrFaxNumber": null,
            "applicant": null,
            "appAddress": null,
            "appContact": null,
            "appEmail": null,
            "appPhoneNumber": null,
            "appFaxNumber": null,
            "dateCreated": 1508555014000,
            "buildinPower": false,
            "agentOnline": false
        },
        "reportError": 0,
        "testError": 0
    }
]

$.mockjax({
    url: "/tests",
    status: 200,
    responseText: rep,
    statusText: 'success'
});
*/