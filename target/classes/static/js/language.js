var languages = [
    {
        lang: "中文",
        content: {
            USER_TITLE: "用户",
            SCENARIO_TITLE: "场景",
            DEVICE_TITLE: "设备",
            VM_TITLE: "虚拟机",
            TITLE: "云端数据管理及定位测试综合平台",
            ACCOUNT_SEETING: "账户设置",
            PASSWORD_MANAGE: "密码管理",
            RESGISTER_USER: "注册用户",
            SCENRIO_FILES: "场景文件",
            TEST_SCENARIO: "测试场景",
            VM_LIST: "虚拟机列表",
            HEADER: "测试平台",
            LANAGUAGE: "语言",
            HOME_PAGE: "主页",
            MACHINE_MANAGEMENT: "设备管理",
            TEST_SUBMIT: "测试申请",
            TEST_SUBMIT_DESCRIPTION: "选择一个设备进行场景测试",
            TEST_MANAGERMENT: "测试管理",
            LOG_IN: "注册/登录",
            ABOUT: "关于",
            CONTACT: "联系我们",
            USER_LOGIN: "用户登录",
            PASSWORD_MISMATCH: "两次密码不一致",
            SUBMIT_LOGIN: "登录",
            SUBMIT_REGISTER:"注册",
            SUBMIT_SAVE: "保存",
            CANCEL_BUTTON:"取消",
            TEST_SUBMIT_HEADER: "测试类型",
            TEST_INTRODUCTION: "测试介绍",
            TEST_RESULT:"测试结果",
            TEST_SUBMIT_BUTTON: "提交测试",
            TEST_MANAGERMENT_HEADER: "管理你的测试 通过",
            TEST_RECORD: "测试记录",
            TEST_RECORD_DESCRIPTION: "查看测试历史和测试状态",
            NOT_A_MEMBER: "还没有账号？",
            REGISTER: "现在注册",
            MACHINE_REGISTER: "已注册设备",
            USER_MANAGEMENT: "用户管理",
            SCENARIO_MANAGERMENT: "测试场景管理",
            VM_MANAGERMENT: "虚拟机管理",
            LOG_OUT: "注销",
            SUBMIT_MODIFY: "修改",
            SUBMIT_ADD: "添加",
            REGISTER_TIME: "注册时间",
            CHECK: "查看",
            MODIFY: "修改",
            DELETE: "删除",
            SELECT: "选择",
            DEVICE_OWNER: "所有者",
            SELECT_DEVICE: "请选择设备",
            NO_DEVICE: "您还没有注册设备",
            CANCEL_TEST: "停止测试",
            TEST_OWNER: "申请用户",
            ACCOUNT_INFORMATION: "账户信息",
            DEVICE_INFORMATION: "设备信息",
            USER_INFORMATION: "用户信息",
            SCENARIO_INFORMATION: "测试场景信息",
            NO_TEST_ADMIN: "还没有测试被申请",
            NO_AVAILABLE_SCENARIO: "您没有可用的测试场景",
            NO_TEST_SUBMIT: "您还没有申请过测试",
            NO_SCENARIO_ADD: "您还没有添加测试场景，点击 “+” 添加",
            NO_DEVICE_ADMIN: "还没有设备注册到系统",
            NO_DEVICE_ADD: "您还没有注册设备，点击 “+” 注册",
            NO_AVAILABLE_USER: "还没有用户注册到系统",
            CHECK_FILE: "查看频点文件",
            SELECT_FILE: "选择频点文件",
            SELECT_FREQUENCY: "选择频点",
            FREQUENCY_POINT: "频点",
            SUBMIT_UPLOAD: "上传",
            TEST_FILE: "频点文件",
            FILE_NAME: "文件名",
            UPLOAD_TEST_FILE: "该场景还没有频点文件，请上传",
            NO_TEST_FILE: "该场景还没有频点文件",
            SELECT_TEST_FILE: "请选择频点文件",
            USER_VIP: "付费用户",
            USER_NO_VIP: "未付费用户",
            USER_TYPE: "用户类型",
            SELECT_SCENARIO: "请选择一个测试场景",
            NO_SCENARIO: "没有可用的测试场景",
            SCENRIO_TEST_FILES: "场景名称：",
            NO_SCENARIO_TEST_FILE_1: "该场景还没有频点文件",
            NO_SCENARIO_TEST_FILE_2: "您没有选择任何测试场景",
            LOGIN_ERROR: "用户名或者密码错误",
            REGISTER_NEXT: "下一步",
            TEST_FILE_NAME: "文件名",
            TEST_FILE_STATE: "文件状态",
            DETAIL: "详情",
            NO_AVAILABLE_TEST_FILE: "该场景还未上传频点文件",
            NOT_DOWNLOAD: "未下载",
            CLICK_DOWNLOAD: "点击下载",
            DOWNLOADING: "正在下载",
            CHECK_DOWNLOAD_PROCESS: "查看下载进度",
            DOWNLOADED: "已下载",
            MANDATORY_DATA: "请填写信息（* 为必填项）",
            FIlE_SIZE: "文件大小",
            SCENARIO_DOWNLOAD: "场景下载",
            DOWNLOAD_TEST_FILE: "点击下载按钮下载所有未下载的频点文件",
            DOWNLOAD_BUTTON: "下载",
            DOWNLOAD_PRENCENT: "已完成",
            DOWNLOAD_SPEED: "下载速度",
            DOWNLOAD_QUEUE: "前面还有${0}位用户等待下载",
            CONFLICT_ERROR_MESSAGE: "添加${0}失败，该${0}已经存在",
            CHECK_REALTIME_STATE: "查看实时状态",
            CHECK_TEST_REPORT: "查看测试报告",
            ACTION: "操作",
            NO_VM_ADD: "您还没有添加虚拟机，点击 “+” 添加",
            VM_INFORMATION: "虚拟机信息",
            IP_ADDRESS: 'IP地址',
            CPU: "CPU功率（单位 HZ）",
            HARD_DISK: "磁盘空间（单位 GB）",
            MEMORY: "内存大小（单位 GB）",
            STATE: "是否可用",
            YES: "是",
            NO: "否",
            TEST_REAL_STATUS: "实时测试状态",
            TEST_DEVICE_SERIESNUMBER: "设备序列号",
            SIGNAL_NOISE_RATIO: "信噪比 (分贝)",
            SATELITE_NUBMER: "卫星编号",
            CURRENT_TIME: "当前时间",
            CONTACT_INFORMATION: "联系信息",
            LOAD_DEVICE_ERROR: "获取设备信息失败。",
            MODIFY_DEVICE_SUCESS: "设备信息修改成功。",
            REMOVE_DEVICE_SUCESS: "设备删除成功。",
            REMOVE_DEVICE_ERROR: "设备删除失败。",
            REMOVE_DEVICE_ERROR_AGENT_MISS: "删除设备信息失败，请先启动硬件客户端。",
            REMOVE_DEVICE_ERROR_CONFLICT: "删除设备信息失败，该设备已经申请测试，不能删除。",
            CREATE_DEVICE_SUCCESS: "设备创建成功。",
            LOAD_DEVICE_ERROR_AGENT_MISS: "获取设备信息失败，请先启动硬件客户端。",
            LOAD_USER_ERROR: "获取用户信息失败。",
            MODIFY_USER_SUCCESS: "用户信息修改成功。",
            REMOVE_USER_SUCCESS: "用户删除成功。",
            REMOVE_USER_ERROR: "用户删除失败。",
            CREATE_USER_SUCCESS: "用户创建成功。",
            REMOVE_USER_ERROR_CONFILCT: "用户删除失败, 请先删除该用户拥有的设备。",
            LOAD_SCENARIO_ERROR: "获取场景信息失败。",
            LOAD_SCENARIO_FILE_ERROR: "获取测试文件信息失败。",
            MODIFY_SCENARIO_SUCCESS: "场景信息修改成功。",
            REMOVE_SCENARIO_SUCCESS: "场景删除成功。",
            REMOVE_SCENARIO_ERROR_CONFLICT: "场景删除失败，该场景已经被用来测试。",
            REMOVE_SCENARIO_ERROR: "场景删除失败。",
            CREATE_SCENARIO_SUCCESS: "场景创建成功。",
            MODIFY_VM_SUCCESS: "虚拟机信息修改成功。",
            LOAD_VM_ERROR: "获取虚拟机信息失败。",
            REMOVE_VM_SUCCESS: "虚拟机删除成功。 ",
            REMOVE_VM_ERROR: "虚拟机删除失败。",
            CREATE_VM_SUCCESS: "虚拟机创建成功。",
            LOAD_TEST_FILE_ERROR_AGENT_MISS: "获取测试文件失败，请先启动硬件客户端。",
            LOAD_DOWNLOAD_PROCESS_ERROR: "获取下载信息失败。",
            SUBMIT_TEST_SUCCESS: "测试申请成功",
            SUBMIT_TEST_ERROR_AGENT_MISS: "测试申请失败，请先启动硬件客户端。",
            LOAD_TEST_RECORD_ERROR: "获取测试记录失败。",
            SUBMIT_TEST_ERROR: "测试申请失败。",
            UPLOAD_FILE_SUCCESS: "文件上传成功。",
            HOMEPAGE_INTRODUCE: "  中国泰尔实验室（China Telecommunication Technology Labs）始于1981年9月21日，其前身是中国电话参考当量检测中心，由原国家标准总局和原中华人民共和国邮电部经（1981）邮科字957号文联合批准成立。2000年1月20日由原国家质量技术监督局和中华人民共和国信息产业部联合批准，同意将中国电话参考当量检测中心更名为中国泰尔实验室（质技监局认函【2000】15号文）。",
            HOMEPAGE_INTRODUCE_2: "  中国泰尔实验室（China Telecommunication Technology Labs）质量体系包括：国家通信计量站、国家电话机质量监督检验中心信息产业图文通信设备质量监督检验中心、信息产业北京移动通信设备质量监督检验中心、信息产业北京电话交换设备质量监督检验中心、信息产业邮电工业产品质量监督检验中心、信息产业通信电磁兼容质量监督检验中心、信息产业通信设备抗震性能质量监督检验中心、信息产业通信软件测评中心。",
            CHANGE_PWD_SUCCESS: "修改密码成功，5秒后跳转到登录界面。",
            CHANGE_PWD_ERROR: "修改密码失败。",
            CHANGE_INFO_SUCCESS: "修改信息成功",
            CHANGE_INFO_ERROR: "修改信息失败",
            JUDGE_FILE: "评判文件",
            BACK_HOMEPAGE: "回到首页",
            POWER_SETTING: "功率设定",
            TEST_MODEL: "测试模式",
            NO_SELECT_FILE: "请先选择频点",
            START_DOWNLOADING: "开始下载",
            TEST_STATUS: "测试状态",
            TEST_HISTORY: "历史记录",
            NO_TEST_FINISH: "你还没有已完成的测试",
            TEST_HISTORY: "历史记录",
            GET_DOWNLOAD_PROCESS_ERROR: "获取下载信息失败",
            DOWNLOAD_ERROR_NO_AGENT: "下载失败，请先启动硬件客户端。",
            ADJUST_TEST: "调节测试参数",
            ADJUST_TEST_SUCESS: "调节测试参数成功",
            ADJUST_TEST_ERROR: "调节测试参数失败",
            SELECT_TEST_CHANNEL: "测试通道",
            ATTENUATION: "衰减值",
            UTC: "UTC 时间",
            LATITUDE: "纬度",
            LONGITUDE: "经度",
            PREVIOUS_PAGE: "上一页",
            BACK_SCENARIO_LIST: "返回场景列表",
            DOWNLOAD_ERROR: "下载失败，请联系管理员",
            DOWNLOAD_START: "开始下载",
            READY_TO_TEST: "可以用来测试",
            NOT_READY_TO_TEST: "还未准备好测试",
            SAME_ACCOUNT_ERROR: "此用户名或邮箱已被注册",
            NO_TEST_FILE_CANBE_DOWNLOAD: "没有文件可以被下载",
            DOWNLOAD_STATUS: "下载状态",
            WAIT_TEST: "等待测试",
            CANCEL: "取消",
            ERROR_TEST_STATUS: "获取数据失败，硬件设备未启动。",
            NO_AVAIABLE_TEST_FILE: "没有可用来测试的频点文件",
            IF_READY_TO_TEST: "是否可以用来测试",
            PLEASE_SELECT_SCENARIO_TO_TEST: "请选择一个场景进行测试",
            NO_ALLOW_MUTIPLE_SUBMIT: "不允许选择多个场景进行测试",
            CANCEL_DOWNLOADING: "取消下载成功",
            CANCEL_DOWNLOADING_ERROR: "取消下载失败",
            REPORT_TITLE: "测试报告",
            GET_REPORT_ERROR: "获取测试报告失败",
            DELETE_TEST: "删除测试",
            PENDING_APPROVAL: "等待批准",
            TEST_APPROVAL: "测试已批准",
            TEST_RUNNING: "测试正在运行",
            TEST_FINISHED_NO_REPORT: "测试已完成，等待生成报告",
            CANCEL_TEST_SUCCESS: "停止测试成功",
            CANCEL_TEST_ERROR: "停止测试失败",
            TEST_REPORT_GENERATING: "正在生成测试报告",
            TEST_CANCELED: "测试已取消",
            TEST_DONE: "测试已完成",
            TEST_FAILED: "测试失败",
            RESET_TEST: "重新发起测试",
            DELETE_TEST_SUCCESS: "删除测试成功",
            DELETE_TEST_ERROR: "删除测试失败",
            DATE_START: "开始时间",
            DATE_END: "结束时间",
            TEST_WAITING: "等待测试运行",
            DELETE_FILE_BUTTON: "删除已下载的频点文件",
            DOWNLOAD_FILE_BUTTON: "下载选中的频点文件",
            DELETE_FILE_SUCCESS: "删除文件成功",
            DELETE_FILE_ERROR: "删除文件失败",
            TEST_ID: "编号",
            PLAY_LOOP: "循环播放",
            MUNITE: "分钟",
            PLAY_TIME: "播放时间",
            RF_MANAGERMENT: "射频设备管理",
            SELECT_RF_DEVICE: "请选择一个射频设备",
            SELECT_TARGET_DEVICE: "请选择要测试的设备",
            RESET_PASSWORD: "重置密码",
            RESET_PASSWORD_SUCCESS: "重置密码成功，新密码已发至您的注册邮箱",
            RESET_PASSWORD_ERROR: "重置密码失败，请确认用户名和邮箱是否正确",
            RESET_SUBMIT: "提交",
            DOWNLOAD_TEST_REPORT: "下载测试数据",
            END_DEVICE: "终端设备",
            RF_DEVICE: "射频设备",
            SAMPLE_BIT: {
                LABEL: "采样比特",
                PLACEHOLDER: "请输入采样比特",
            },
            SAMPLE_RATE: {
                LABEL: "采样率",
                PLACEHOLDER: "请输入采样率",
            },
            // register form
            USER: {
            	ACCOUNT: "用户名",
                INPUT_ACCOUNT: "请输入用户名",
                EMPTY_USER: "请您输入用户名",
            },
            PASSWORD: {
            	PASSWORD: "密码",
                INPUT_PASSWORD: "请输入密码",
                EMPTY_PASSWORD: "请您输入密码",
            },
            CONFIRM_PASSWORD: {
            	CONFIRM_PASSWORD: "确认密码",
                INPUT_PASSWORD_CONFIRM: "请确认密码",
                EMPTY_CONFIRM_PASSWORD: "请您确认密码",
            },
            EMAIL: {
                EMAIL: "电子邮箱",
                INPUT_EMAIL: "请输入电子邮箱",
                EMPTY_EMAIL: "请您输入电子邮箱"
            },
            PHONE: {
                PHONE_NUMBER: "电话",
                INPUT_PHONE_NUMBER: "请输入电话号码"
            },
            FAX: {
                FAX_NUMBER: "传真",
                INPUT_FAX_NUMBER: "请输入传真号码"
            },
            EMPLOYER: {
                EMPLOYER: "公司",
                INPUT_EMPLOYER: "请输入公司名称"
            },
            ADDRESS: {
                ADDRESS: "地址",
                INPUT_ADDRESS: "请输入地址"
            },
            CONTACTOR: {
                CONTACTOR: "联系人",
                INPUT_CONTACTOR: "请输入联系人姓名"
            },
            LICENSE: {
                LICENSE: "证书",
                INPUT_LICENSE: "请输入证书"
            },
            ROLE: {
                ROLE: "用户角色",
                ADMIN: "管理员",
                USER: "普通用户",
            },

            //Register device form
            DEVICE_NAME: {
                LABEL: "设备名称",
                PLACEHOLDER: "请输入名称",
                EMPTY: "请输入名称"
            },
            DEVICE_TRADENAME: {
                LABEL: "设备市场名称",
                PLACEHOLDER: "请输入市场名称"
            },
            DEVICE_MODEL: {
                LABEL: "设备型号",
                PLACEHOLDER: "请输入型号"
            },
            DEVICE_BRAND: {
                LABEL: "品牌",
                PLACEHOLDER: "请输入设备品牌"
            },
            DEVICE_NUMBER: {
                LABEL: "射频设备识别码",
                PLACEHOLDER: "请输入识别码"
            },
            DEVICE_HARDWARE: {
                LABEL: "硬件版本",
                PLACEHOLDER: "请输入硬件版本"
            },
            DEVICE_SOFTWARE: {
                LABEL: "软件版本",
                PLACEHOLDER: "请输入软件版本"
            },
            DEVICE_TYPE: {
                LABEL: "产品类型",
                TYPE_1: "类型 1",
                TYPE_2: "类型 2"
            },
            DEVICE_ANTENNA: {
                LABEL: "天线类型",
                TYPE_1: "类型1",
                TYPE_2: "类型2"
            },
            DEVICE_AUTO_TRANSFORM: {
                LABEL: "自动转换"
            },
            DEVICE_HEAD_MICRO_PHONE: {
                LABEL: "听筒/麦克"
            },
            DEVICE_HEADPHONE_TYPE: {
                LABEL: "双听筒"
            },
            DEVICE_MICROPHONE_TYPE: {
                LABEL: "双麦克风"
            },
            DEVICE_CHIP: {
                LABEL: "芯片信息"
            },
            DEVICE_CHIP_VENDER: {
                LABEL: "供应商",
                PLACEHOLDER: "请输入供应商"
            },
            DEVICE_RADIO_FREQUENCY: {
                LABEL: "无线电频率"
            },
            DEVICE_BASEBAND: {
                LABEL: "基带",
                TYPE_1: "1",
                TYPE_2: "2"
            },
            DEVICE_OS_TITLE: "操作系统",
            DEVICE_OS: {
                LABEL: "系统类型",
                TYPE_1: "ios",
                TYPE_2: "android"
            },
            DEVICE_OS_VERSION: {
                LABEL: "系统版本",
                PLACEHOLDER: "请输入系统版本"
            },
            DEVICE_WORK_MODE: {
                LABEL: "工程模式",
                PLACEHOLDER: "请输入工程模式"
            },
            DEVICE_CHECK_VERSION: {
                LABEL: "如何检查软件版本",
                PLACEHOLDER: "请列出步骤"
            },
            DEVICE_VOLTAGE: {
                LABEL: "工作电压",
            },
            DEVICE_MINIMUN_VOLTAGE: {
                LABEL: "最低电压"
            },
            DEVICE_NORMAL_VOLTAGE: {
                LABEL: "正常电压"
            },
            DEVICE_MAXIMUN_VOLTAGE: {
                LABEL: "最高电压"
            },
            DEVICE_TEMPERATURE: {
                LABEL: "工作温度"
            },
            DEVICE_MINIMUN_TEMPERATURE: {
                LABEL: "最低温度"
            },
            DEVICE_MAXIMUN_TEMPERATURE: {
                LABEL: "最高温度"
            },
            DEVICE_POWER: {
                LABEL: "供电方式",
                TYPE_1: "直流",
                TYPE_2: "电池",
            },
            DEVICE_BUILD_IN_POWER: {
                LABEL: "内嵌"
            },
            DEVICE_SIZE: {
                LABEL: "产品尺寸",
            },
            DEVICE_LENGTH: {
                LABEL: "长度",
                PLACEHOLDER: "请输入设备长度"
            },
            DEVICE_WIDTH: {
                LABEL: "宽度",
                PLACEHOLDER: "请输入设备宽度"
            },
            DEVICE_HEIGHT: {
                LABEL: "高度",
                PLACEHOLDER: "请输入设备高度"
            },
            DEVICE_ANTENNA_GAIN: {
                LABEL: "天线增益",
                PLACEHOLDER: "具体到每根天线和band",
            },
            DEVICE_MANUFACTURER: {
                LABEL: "制造商",
                PLACEHOLDER: "请输入设备制造商"
            },
            // scenario from
            SCENARIO_NAME: {
            	    LABEL: "场景名称",
            	    PLACEHOLDER: "请定义场景名称"
            },
            SCENARIO_DESCRIPTION: {
                LABEL: "场景描述",
            	PLACEHOLDER: "请描述该场景"
            },
            SCENARIO_NUMBER: {
	        	    LABEL: "场景编号",
	        	    PLACEHOLDER: "请输入场景编号"
	        },
	        SCENARIO_SIZE: {
	        	    LABEL: "场景大小"
	        },
	        SCENARIO_FREE: {
	        	    LABEL: "免费场景"
            },
            NEW_PASSWORD: {
                LABEL: "新密码",
                INPUT_PASSWORD: "请输入密码",
                EMPTY_PASSWORD: "请您输入密码",
            },
            DATE_CREATED: "创建时间",
            TEST_STATE: "测试状态",
            TEST_REPORT: "测试报告",
            TESTMANAGER: {
                HISTORY: "生成测试记录",
                RESULT: "查看测试历史",
                CASE: "管理测试用例"
            },
            NEWS: {
                TOPIC_NEWS: "资讯",
                NEWS: "NB-IoT是NarrowBand Internet of Things的英文缩写，是基于蜂窝网络的窄带物联网技术。因其低功耗广覆盖的特性，并可从蜂窝网络平滑升级的低成本部署的特性，广受各行业关注。目前已广泛应用于远程抄表、智慧家居、智能路灯、停车、烟雾报警等领域，未来还可在物流监控、环保监控、安防监控、车联网、智能井盖等行业大展拳脚，发展潜力巨大。",
                TOPIC_INTRODUCTION: "简介",
                INTRODUCTION: "行业内最专业的测试系统，庞大的通信模拟网资源，测试更深入。测试结果精准直接，丰富的截图和详细的日志，准确快速定位。最新上市热门高端旗舰机型，每周及时更新，紧跟市场潮流",
                TOPIC_SERVICE: "服务指南",
                SERVICE: " SERVICESERVICESERVICESERVICESERVICESERVICE"
            },

            APP_TEST: {
                NAME: "应用测试",
                INTRODUCTION: "应用测试",
                RESULT: "测试结果"
            },
            UI_TEST: {
                NAME: "用户体验测试",
                INTRODUCTION: "用户体验测试",
                RESULT: "测试结果"
            },
            NET_FRIEND_TEST: {
                NAME: "网络友好测试",
                INTRODUCTION: "网络友好测试",
                RESULT: "测试结果"
            },
            QUICK_TEST: {
                NAME: "快速测试",
                INTRODUCTION: "快速测试",
                RESULT: "测试结果"
            },
            TEST_RECORD_TABLE: {
                TEST_TYPE: "测试类型",
                TEST_START_DATE: "测试开始时间",
                TEST_END_DATE: "测试结束时间",
                TEST_RESULT: "测试结果"
            },
            VM_IP: {
                LABEL: "IP地址",
	        	PLACEHOLDER: "请输入IP地址"
            },
            VM_CPU: {
                LABEL: "CPU (单位 HZ)",
	        	PLACEHOLDER: "请输入分配的CPU功率"
            },
            VM_MEMERY: {
                LABEL: "内存（单位 GB）",
	        	PLACEHOLDER: "请输入分配的内存"
            },
            VM_HARD_DISK: {
                LABEL: "磁盘（单位 GB）",
	        	PLACEHOLDER: "请输入分配的磁盘"
            },
            VM_STATE: {
                LABEL: "是否可用"
            }
        },
    },
    {
        lang: "ENGLISH",
        content: {
            HOME_PAGE: "Home Page",
            CLOUD_MANAGEMENT: "Cloud Management",
            TEST_SUBMIT: "Test Submit",
            TEST_MANAGERMENT: "Test Management",
            LOG_IN: "Sign in",
            ABOUT: "About",
            CONTACT: "Contacts",
            USER_LOGIN: "Login with your account",
            INPUT_ACCOUNT: "Account",
            INPUT_PASSWORD: "Password",
            SUBMIT_LOGIN: "LOGIN NOW"
        }
    }
]
