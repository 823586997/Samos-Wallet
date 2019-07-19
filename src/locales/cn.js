import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const cn = {
  "nav": {
    "wallet": "钱包",
    "transfer": "转账",
    "consensus": "共识",
    "contracts": "合约",
    "application": "应用",
    "set": "设置",
    "addressList": "地址管理",
    "nodeList": "服务节点",
    "help": "帮助",
  },

  "public": {
    "copySuccess": "已复制到剪切板",
    "operation": "操作",
    "display": "显示",
    "total": "共",
    "hideReward": "隐藏共识奖励",
    "usableBalance": "可用余额",
    "fee": "手续费",
    "next": "下一步",
    "basicData": "基础信息",
    "time": "时间",
    "amount": "金额",
    "height": "高度",
    "type": "类型",
    "status": "状态",
    "nodeID": "节点ID",
    "roundInfo": "轮次信息",
    "rotation": "轮次",
    "number": "编号",
    "alias": "别名",
    "createAddress": "创建地址",
    "packingAddress": "打包地址",
    "rewardAddress": "奖励地址",
    "commission": "佣金比例",
    "deposit": "保证金",
    "credit": "信用值",
    "remarks": "备注",
    "participants": "参与人数",
    "totalStake": "总委托量",
    "method": "方法",
    "results": "执行结果",
    "success":"成功",
    "fail":"失败",
    "tokenTransfer":"代币转账",
    "contractName":"合约名称",
    "cancelCollection":"取消收藏",
    "contractInfo":"合约描述",
    "":"",

    "err": "验证并广播交易失败:",
    "err0": "验证并广播交易异常:",
    "err1": "input和outputs组装错误:",
    "err2": "获取账户余额失败:",
    "err3": "获取账户余额异常:",

  },

  "error": {
    "10000": "成功",
    "10001": "失败",
    "10002": "系统错误",
    "10003": "数据解析错误",
    "10004": "贤成名称冲突",
    "10005": "未设置语言",
    "10006": "IO错误",
    "10007": "数据长度不正确",
    "10008": "错误的配置",
    "10009": "签名错误",
    "10010": "请求被拒绝",
    "10011": "数据长度过大",
    "10012": "参数错误",
    "10013": "参数不正确，有参数不能为空",
    "10014": "数据错误",
    "10015": "数据未找到",
    "10016": "下载版本文件失败",
    "10017": "解析JSON数据失败",
    "10018": "文件操作失败",
    "10019": "非法的访问",
    "10020": "实例化异常",
    "10035": "已是最新版本",
    "20000": "存储模块启动失败",
    "20001": "存储错误",
    "20002": "Session未初始化",
    "20003": "有非法的空数据",
    "20004": "批量数据错误",
    "20005": "数据错误",
    "20006": "存储数据失败",
    "20007": "更新数据失败",
    "20008": "回滚数据失败",
    "20009": "数据表不存在",
    "20010": "数据表不存在",
    "20011": "建表数量超过限制",
    "20012": "建表失败",
    "20013": "建表路径错误",
    "20014": "删除表失败",
    "20015": "数据库批量操作关闭",
    "20023": "请求被拒绝",
    "30001": "区块头签名不正确",
    "30002": "区块头基本属性不合法",
    "30003": "区块基本属性不合法",
    "30004": "协议过大",
    "30005": "梅克尔根错误",
    "30006": "删除区块头错误",
    "30007": "交易回滚错误",
    "30008": "共识回滚通知错误",
    "30009": "协议存储通知错误",
    "30010": "共识存储通知错误",
    "30011": "交易保存错误",
    "30012": "区块头保存错误",
    "ac_0000": "密码错误",
    "ac_0001": "账户不存在",
    "ac_0002": "账户已加密",
    "ac_0003": "账户已存在",
    "ac_0004": "地址错误",
    "ac_0005": "别名已存在",
    "ac_0006": "别名不存在",
    "ac_0007": "账户已设置别名",
    "ac_0008": "账户未加密",
    "ac_0009": "别名已存在",
    "ac_0010": "包含已加密的账户",
    "ac_0011": "包含未加密的账户",
    "ac_0012": "私钥格式不正确",
    "ac_0013": "删除别名失败",
    "ac_0014": "账户keystore不存在",
    "ac_0015": "账户keystore已损坏",
    "ac_0016": "别名格式错误",
    "ac_0017": "密码格式错误",
    "ac_0018": "账户加密失败",
    "ac_0019": "账户已加密并锁定",
    "ac_0020": "备注太长了",
    "ac_0021": "输入太小了",
    "ac_0022": "必须烧毁一个NULSZZ",
    "ac_0023": "符号计数太大",
    "ac_0024": "不是当前链地址",
    "ac_0025": "是多重签名地址",
    "ac_0026": "不是多重签名地址",
    "ac_0027": "资产不存在",
    "ac_0028": "余额不足",
    "ac_0029": "余额不足",
    "ac_0030": "链不存在",
    "ac_0031": "CoinData数据不完整",
    "ac_0032": "交易不存在",
    "ac_0033": "未找到交易coinData",
    "ac_0034": "交易数据验证错误",
    "ac_0035": "交易类型错误",
    "ac_0036": "无效的交易或当前版本不可用",
    "ac_0037": "交易数据太大",
    "ac_0038": "交易转出人信息不存在",
    "ac_0039": "交易转入人信息不存在",
    "ac_0040": "链ID是错误的",
    "ac_0041": "资产ID是错误的",
    "ac_0042": "交易的签名地址不匹配",
    "ac_0043": "已签署交易的地址",
    "ac_0044": "交易有重复的帐户资产",
    "ac_0045": "保存别名错误",
    "ac_0046": "数量太小",
    "ac_0047": "黑洞地址禁止发起交易",
    "cc_0001": "跨链交易的转入地址和转出地址不应该属于同一条链",
    "cc_0002": "没有跨链交易的转出账户",
    "cc_0003": "跨链交易转出账户不是相同的链账户",
    "cc_0004": "跨链交易接收账户不是同一个链账户",
    "cc_0005": "对不起，您的信用额度很低",
    "cc_0006": "对于具有多签名帐户的跨链交易，只能有一个转出帐户。",
    "cc_0007": "多签名帐户跨链交易转出帐户不是多签名帐户",
    "cc_0008": "多签名帐户无法发布普通的跨链交易",
    "cc_0009": "此帐户不是加密帐户",
    "cc_0010": "跨链交易转出账户必须是本链账户",
    "cc_0011": "信用值不足",
    "cc_0012": "不能省略转出帐户和转入帐户。",
    "cc_0013": "接口调用失败",
    "cc_0014": "链不存在",
    "cc_0015": "支付数据验证错误",
    "cc_0016": "交易验证错误",
    "cc_0017": "交易数据验证错误",
    "cc_0018": "事务提交失败",
    "cc_0019": "事务回滚失败",
    "cc_0020": "不是跨链交易",
    "cm_0001": "余额不够",
    "cm_0002": "参数交易错误",
    "cm_0003": "不是跨链交易",
    "cm_1001": "已存在链ID",
    "cm_1002": "链ID必须大于0",
    "cm_1003": "未找到链",
    "cm_1004": "链地址错误",
    "cm_1005": "链状态不正确",
    "cm_1006": "链资产超过1",
    "cm_2000": "资产简称不能为空",
    "cm_2001": "资产简称长度必须小于5",
    "cm_2002": "资产简称已存在",
    "cm_2003": "JSON传输失败",
    "cm_2004": "恢复的资产必须超过0.9",
    "cm_2005": "资产ID已存在",
    "cm_2006": "资产名称不能为空",
    "cm_2007": "资产名称必须小于20",
    "cm_2008": "存款金额必须为200000",
    "cm_2009": "资产初始化编号必须大于10000",
    "cm_2010": "资产初始化编号必须小于100000000",
    "cm_2011": "资产小数位数必须大于4",
    "cm_2012": "资产小数位数必须小于8",
    "cm_2013": "用于计算的链不是用于注册资产的链",
    "cm_2014": "资产不存在",
    "cm_2015": "资产编号超过初始化数量",
    "cm_2016": "资产地址错误",
    "cm_2017": "交易hash错误",
    "cm_2018": "事务寄存器rpc调用错误",
    "cm_2019": "分类帐余额rpc调用错误",
    "cm_3000": "帐户验证错误",
    "cm_3001": "帐号签名数据错误。",
    "cs_0001": "数据错误",
    "cs_0002": "交易不存在",
    "cs_0003": "节点不存在",
    "cs_0004": "数据不存在",
    "cs_0005": "地址错误",
    "cs_0006": "参数错误的",
    "cs_0007": "打包地址不能与节点地址相同",
    "cs_0008": "打包地址和奖励地址不能相同",
    "cs_0009": "佣金超出范围",
    "cs_0010": "保证金超出范围",
    "cs_0011": "令牌数量错误",
    "cs_0012": "交易数据验证错误",
    "cs_0013": "节点存在",
    "cs_0014": "已使用节点打包地址",
    "cs_0015": "佣金比例太低",
    "cs_0016": "重复交易",
    "cs_0017": "超过可委托的最高金额",
    "cs_0018": "小于最低保证金额",
    "cs_0019": "数据添加失败",
    "cs_0020": "数据回滚失败",
    "cs_0021": "梅克尔根验证错误",
    "cs_0022": "轮次数据验证失败",
    "cs_0023": "信用不足",
    "cs_0024": "链不存在",
    "cs_0025": "红牌和黄牌交易错误",
    "cs_0026": "区块签名错误",
    "cs_0027": "红牌交易验证错误",
    "cs_0028": "共识奖励验证错误",
    "cs_0029": "验证交易列表是否为空",
    "cs_0030": "远程方法调用失败",
    "cs_0031": "帐户验证错误",
    "cs_0032": "交易签名验证错误",
    "cs_0033": "交易资产信息错误",
    "cs_0034": "委托交易已从委托中撤回",
    "cs_0035": "退出共识交易未确认",
    "cs_0036": "尝试分叉",
    "cs_0037": "双花",
    "cs_0038": "获得太多黄牌",
    "lg_0001": "参数错误",
    "lg_0002": "链初始化异常",
    "lg_1001": "孤儿交易",
    "lg_1002": "双花。",
    "lg_1003": "交易已存在",
    "lg_1010": "失败",
    "nw_0001": "网络消息错误",
    "nw_0002": "网络消息发送失败",
    "nw_0003": "网络消息发送异常",
    "nw_0004": "网络消息广播错误",
    "nw_0005": "对等节点断开连接",
    "nw_0006": "对等节点通道异常",
    "sc_0001": "合约执行错误",
    "sc_0002": "合约地址不存在",
    "sc_0003": "创建合约tx错误",
    "sc_0004": "非法合约地址",
    "sc_0005": "非合约交易",
    "sc_0006": "非合约交易的资金不能转移到合约地址",
    "sc_0007": "名称格式不正确",
    "sc_0008": "非NRC20合约",
    "sc_0009": "非查看方法",
    "sc_0010": "非法合约代码",
    "sc_0011": "重复的令牌名称",
    "sc_0012": "符号的格式不正确",
    "sc_0013": "合约已锁定",
    "sc_0014": "小数值的范围为0到18",
    "sc_0015": "totalSupply的值范围为1到2 ^ 256  -  1",
    "sc_0016": "价格的最小值是25",
    "sc_0017": "当余额不为0时无法删除合约",
    "sc_0018": "合约删除者必须是合约创建者",
    "sc_0019": "合约已被删除",
    "sc_0020": "超过合约调用的最大GAS限制",
    "sc_0021": "不执行视图方法",
    "sc_0022": "本合约不接受直接转入资产",
    "sc_0023": "合约方法不存在",
    "sc_0024": "无法锁定转移金额",
    "sc_0025": "转移到合约地址的余额不足",
    "sc_0026": "合约创建者不是交易创建者",
    "sc_0027": "合约调用者不是交易创建者",
    "sc_0028": "合约删除者不是交易创建者",
    "sc_0029": "合约删除者不是合约创建者",
    "sc_0030": "合约余额异常",
    "sc_0031": "接收方不是合约地址。",
    "sc_0032": "令牌余额不足",
    "sc_0033": "不同的模块注册了重复的cmd",
    "sc_0034": "接口不支持非字符串数组返回值",
    "sc_0035": "非法操作，无法传输令牌，无法发送事件，无法内部传输，无法在内部调用契约，无法生成新事务",
    "sc_0100": "余额不足",
    "sc_0101": "交易费用不对",
    "sc_0102": "传输量太小",
    "sc_0103": "交易不存在",
    "sc_0104": "密码错误",
    "sc_0105": "帐户不存在",
    "sc_0106": "地址错误",
    "sc_9999": "合约未知错误",
    "tx_0001": "交易哈希错误",
    "tx_0002": "地址与链不匹配",
    "tx_0003": "地址与链不匹配",
    "tx_0004": "余额不足",
    "tx_0005": "资产ID是错误的",
    "tx_0006": "余额不存在",
    "tx_0007": "余额不存在",
    "tx_0008": "转出数据具有重复的帐户资产",
    "tx_0009": "转入数据有重复的帐户资产",
    "tx_0010": "转出数据不是同一个链",
    "tx_0011": "转入数据不是同一个链",
    "tx_0012": "未找到交易资产数据",
    "tx_0013": "交易已存在",
    "tx_0014": "交易不存在",
    "tx_0015": "反序列化事务错误",
    "tx_0016": "反序列化资产数据错误",
    "tx_0017": "交易的签名地址与交易地址不匹配",
    "tx_0018": "块高度更新在其余时间内无法重新打包",
    "tx_0019": "包获取事务超时",
    "tx_0020": "找不到链",
    "tx_0021": "无效的交易或当前版本不可用",
    "tx_0022": "交易数据验证错误",
    "tx_0023": "交易数据太大",
    "tx_0024": "帐户不存在",
    "tx_0025": "交易账本验证失败",
    "tx_0026": "孤儿交易",
    "tx_0027": "重复交易"
  },

  "tab": {
    "tab0": "资产",
    "tab1": "类型",
    "tab2": "总额",
    "tab3": "锁定",
    "tab4": "可用",
    "tab5": "时间",
    "tab6": "金额",
    "tab7": "解冻时间",
    "tab8": "冻结原因",
    "tab9": "余额",
    "tab10": "状态",
  },

  "type": {
    "undefined": "",
    "0": "全部交易",
    "1": "共识奖励",
    "2": "转账交易",
    "3": "设置别名",
    "4": "创建节点",
    "5": "加入共识",
    "6": "退出共识",
    "7": "黄牌惩罚",
    "8": "红牌惩罚",
    "9": "注销节点",
    "10": "跨链交易",
    "11": "注册跨链",
    "15": "创建合约",
    "16": "调用合约",
    "17": "删除合约",
    "18": "合约转账",
    "19": "合约返还",
  },

  "budgetType": {
    "undefined": "",
    "0": "收入/支出",
    "1": "收入",
    "2": "支出",
  },

  "frozenType": {
    "undefined": "",
    "1": "高度锁定",
    "2": "时间锁定",
    "3": "共识锁定",
    "4": "创建节点",
    "5": "加入共识",
    "8": "红牌惩罚",
    "9": "注销节点",
    "11": "注册跨链",
  },

  "addressType": {
    "undefined": "",
    "1": "普通地址",
    "2": "合约地址",
    "3": "多签地址"
  },

  "transferStatus": {
    "undefined": "",
    "0": "未确认",
    "1": "已确认"
  },

  "nodeType": {
    "undefined": "",
    "0": "综合排序",
    "1": "信用值",
    "2": "佣金",
    "3": "委托量",
    "4": "保证金"
  },

  "assetsType":{
    "undefined": "",
    "0": "所有资产",
    "1": "普通资产",
    "2": "合约资产",
  },

  "history": {
    "0": "所有历史",
    "1": "加入历史",
    "2": "退出历史",
  },

  "nodeStatus": {
    "undefined": "",
    "0": "全部节点",
    "1": "普通节点",
    "2": "开发者节点",
    "3": "大使节点"
  },

  "lockType": {
    "undefined": "",
    "4": "创建节点锁定",
    "5": "加入共识锁定",
    "8": "红牌惩罚锁定",
    "9": "注销节点锁定",
    "11": "注册跨链",
  },

  "contractStatus": {
    "undefined": "",
    "-1": "创建失败",
    "0": "未认证",
    "1": "认证中",
    "2": "认证通过",
    "3": "已删除"
  },

  "password": {
    "password0": "密码",
    "password1": "请输入密码",
    "password2": "取 消",
    "password3": "确 定",
  },

  "home": {
    "home0": "主网资产",
    "home1": "跨链资产",
    "home2": "交易记录",
  },

  "frozenList": {
    "frozenList0": "冻结列表",
  },

  "transfer": {
    "transfer0": "付款地址:",
    "transfer1": "收款地址:",
    "transfer2": "资产类型:",
    "transfer3": "转账金额:",
    "transfer4": "备注:",
    "transfer5": "该手续费值是根据当前NULS网络预估的，实际消耗可能小于该值，多余部分将会通过共识奖励退回",
    "transfer6": "转账确认",
    "transfer7": "取 消",
    "transfer8": "确认提交",
    "transfer9": "请输入收款地址",
    "transfer10": "请输入正确的收款地址",
    "transfer11": "请输入金额",
    "transfer12": "金额必须为数字",
    "transfer13": "金额必须大于0.001",
    "transfer14": "金额不能大于可用余额",
    "transfer15": "提示：您填写的地址是跨链地址这笔交易将是跨链交易，您只能选择基本资产...",
    "transfer16": "付款地址的NULS不足，请切换账户",
    "transfer17": "跨链交易本链不足，请切换账户",
    "transfer": "transfer",
  },

  "consensus": {
    "consensus0": "我的共识",
    "consensus1": "共识锁定",
    "consensus2": "可用余额",
    "consensus3": "总共识奖励",
    "consensus4": "所有共识",
    "consensus5": "创建",
    "consensus6": "共识节点",
    "consensus7": "总节点数",
    "consensus8": "总委托量",
    "consensus9": "所有节点",
    "consensus10": "请选择输入ID\\别名\\地址....",
    "consensus11": "我的节点",
  },

  "newConsensus": {
    "newConsensus0": "创建节点",
    "newConsensus1": "创建节点确认",
    "newConsensus2": "请输入奖励地址",
    "newConsensus21": "请输入正确的奖励地址",
    "newConsensus3": "请输入打包地址",
    "newConsensus31": "请输入正确的打包地址",
    "newConsensus4": "打包地址不能为创建地址",
    "newConsensus5": "请输入保证金",
    "newConsensus6": "保证金必须数字值",
    "newConsensus7": "对不起，余额不足",
    "newConsensus8": "保证金不小于20000并且不大于500000",
    "newConsensus9": "请输入佣金比例",
    "newConsensus10": "佣金比例为10-100之间的整数",
    "newConsensus11": "保证金不小于10并且不大于100",
    "newConsensus12": "创建地址有过红牌惩罚不能再创建节点",
  },

  "consensusList": {
    "consensusList0": "共识明细",
    "consensusList1": "加入时间",
  },

  "consensusInfo": {
    "consensusInfo0": "退出",
    "consensusInfo1": "委托金额",
    "consensusInfo2": "委托金额不能为空",
    "consensusInfo3": "请输入有效的委托金额数值",
    "consensusInfo4": "委托金额不小于2000并且总委托额小于500000",
    "consensusInfo5": "注销节点",
    "consensusInfo6": "节点信息",
    "consensusInfo7": "总奖励",
    "consensusInfo8": "创建者别名",
    "consensusInfo9": "创建时间",
    "consensusInfo10": "节点惩罚",
    "consensusInfo11": "黄牌",
    "consensusInfo12": "节点创建人需要向该节点的委托人收取一定比例的共识出块奖励，即佣金。举例：若某时某委托人的全部共识奖励为10 SAMOS，佣金比例设置为10%，则创建人收取10*10% 1 NULS佣金，委托人实际得到NULS共识奖励",
  },

  "nodeService": {
    "nodeService0": "节点切换中...",
    "nodeService1": "节点服务列表",
    "nodeService2": "名称",
    "nodeService3": "服务地址",
    "nodeService4": "延迟",
    "nodeService5": "状态",
    "nodeService6": "操作",
    "nodeService7": "修改",
    "nodeService8": "移除",
    "nodeService9": "添加节点服务地址",
    "nodeService10": "您输入的非官方地址可能无法正常使用，因此造成的损失将由您自己承担",
    "nodeService11": "测试连接",
    "nodeService12": "立即使用",
    "nodeService13": "名称不能为空",
    "nodeService14": "地址不能为空",
    "nodeService15": "请输入正确的连接地址",
    "nodeService16": "节点不可以连接",
    "nodeService17": "连接失败",
    "nodeService18": "请求超时",
    "nodeService19": "此操作将移除",
    "nodeService20": "节点服务是否继续?",
    "nodeService21": "提示",
    "nodeService22": "移除成功",
    "official": "官方",
    "nodeService23": "链名",
  },

  "address": {
    "address0": "地址管理",
    "address1": "账户",
    "address2": "余额",
    "address3": "别名",
    "address4": "备注",
    "address5": "操作",
    "address6": "修改密码",
    "address7": "备份",
    "address8": "移除",
    "address9": "请输入备注",
    "address10": "取 消",
    "address11": "确 定",
    "address12": "对不起，账户余额不足",
    "address13": "密码错误",
    "address": "",

  },

  "newAddress": {
    "newAddress0": "创建钱包",
    "newAddress1": "备份账户",
    "newAddress2": "设置密码",
    "newAddress3": "备份",
    "newAddress4": "请设置密码用以导入账户、转账、参与共识等重要行为验证",
    "newAddress5": "请认真保存钱包密码，SAMOS钱包不存储密码，也无法帮您找回，请务必牢记",
    "newAddress6": "密码",
    "newAddress7": "确认密码",
    "newAddress8": "我理解我需要保存好我的密码，否则可能造成资产丢失",
    "newAddress9": "用户协议",
    "newAddress10": "下一步",
    "newAddress11": "导入钱包",
    "newAddress12": "您的账户地址",
    "newAddress13": "请勿遗失！ NULSS将无法帮助您找回遗失的密钥",
    "newAddress14": "请勿向他人分享！ 如在恶意网站使用此文件，您的资金可能面临被盗窃的风险",
    "newAddress15": "请制作备份！ 以防您的电脑故障",
    "newAddress16": "Keystore备份",
    "newAddress17": "明文私钥备份",
    "newAddress18": "进入钱包",
    "newAddress19": "安全警告",
    "newAddress20": "私钥未经加密，备份存在风险，请保存到安全的地方，建议使用Keystore进行备份",
    "newAddress21": "复制",
    "newAddress22": "请输入密码",
    "newAddress23": "请输入由字母和数字组合的8-20位密码",
    "newAddress24": "请再次输入密码",
    "newAddress25": "两次输入密码不一致",
    "newAddress26": "keystore保存失败，请重启再试一次 ",
    "newAddress27": "文件保存完成，位置:",
    "newAddress28": "请选择keystore文件的保存位置",
    "newAddress29": "请选择知晓密码提示",
    "newAddress": "",

  },

  "editPassword": {
    "editPassword0": "修改密码",
    "editPassword1": "旧密码",
    "editPassword2": "新密码",
    "editPassword3": "确认新密码",
    "editPassword4": "提交",
    "editPassword5": "如果你忘记密码可以使用私钥",
    "editPassword6": "请旧输入密码",
    "editPassword7": "请输入由字母和数字组合的8-20位密码",
    "editPassword8": "请输入新密码",
    "editPassword9": "新密码不能和旧密码相同",
    "editPassword10": "请再次输入新密码",
    "editPassword11": "新密码与确认新密码不一样，请重新输入",
    "editPassword12": "密码修改完成",
    "editPassword13": "旧密码错误",
  },

  "importAddress": {
    "importAddress0": "创建地址",
    "importAddress1": "导入钱包",
    "importAddress2": "Keystore 导入",
    "importAddress3": "私钥导入",
    "importAddress4": "选择keystore文件",
    "importAddress5": "请输入你的私钥:",
    "importAddress6": "密码",
    "importAddress7": "确认密码",
    "importAddress8": "导入钱包",
    "importAddress9": "私钥不能为空",
    "importAddress10": "请输入密码",
    "importAddress11": "请输入由字母和数字组合的8-20位密码",
    "importAddress12": "请再次输入密码",
    "importAddress13": "两次输入密码不一致",
    "importAddress14": "请选择导入的keystore文件",
    "importAddress15": "keystore导入失败，请重启再试一次 ",
    "importAddress16": "请选择正确的keystore文件",
    "importAddress17": "请选择一个要导入keystore文件",
  },

  "setAlias": {
    "setAlias0": "设置别名",
    "setAlias1": "别名可作为",
    "setAlias11": "转账的收款人，为了账户安全，别名设置确定后，将无法修改，请谨慎操作",
    "setAlias2": "设置别名需要花费1个",
    "setAlias3": "总花费",
    "setAlias4": "请输入别名",
    "setAlias5": "请输入别名(只允许使用小写字母、数字、下划线（下划线不能在两端）)",
  },

  "contract":{
    "contract1":"我的合约",
    "contract2":"合约地址",
    "contract3":"标签",
    "contract4":"调用",
    "contract5":"查找合约",
    "contract6":"请输入合约地址",
    "contract7":"搜索",
    "contract8":"所有合约",
    "contract9":"合约地址",
    "contract10":"部署合约",
    "contract11":"获取合约列表失败:",
    "contract12":"获取合约列表异常:",
    "contract13":"搜索合约失败:",
    "contract14":"搜索合约异常:",
    "contract15":"请输入正确的合约地址",
    "contract":"",
  },

  "call":{
    "call1":"请选择一个方法",
    "call2":"不能为空",
    "call3":"高级选项",
    "call4":"预估调用合约交易的gas错误",
    "call5":"预估调用合约交易的gas异常",
    "call6":"验证调用合约交易错误",
    "call7":"验证调用合约交易异常",
    "call8":"不上链方法调用失败",
    "call9":"不上链方法调用异常",
    "call10":"gas 太小可能会使合约交易失败",
    "call":"",
  },

  "deploy":{
    "deploy1":"HEX码",
    "deploy2":"Jar包",
    "deploy3":"上传jar包",
    "deploy4":"文件名",
    "deploy5":"测试",
    "deploy6":"部署",
    "deploy7":"请输入hex编码",
    "deploy8":"请输入gas",
    "deploy81":"Gag Limit范围;1~10000000",
    "deploy9":"请输入price",
    "deploy91":"Price必须大于1",
    "deploy10":"获取构造函数错误:",
    "deploy11":"验证创建合约交易错误",
    "deploy12":"验证创建合约交易异常",
    "deploy13":"预估创建合约交易的gas错误",
    "deploy14":"预估创建合约交易的gas异常",
    "deploy15":"组装创建合约交易的txData错误",
    "deploy16":"测试通过",
    "deploy17":"上传jar包错误",
    "deploy18":"上传jar包异常",
    "deploy19":"请输入合约名称",
    "deploy20":"合约名称(只允许使用小写字母、数字、下划线（下划线不能在两端）)",
    "deploy21":"合约名称",
    "deploy":"deploy",
  },

  "codeInfo":{
    "codeInfo0":"合约源代码已认证",
    "codeInfo1":"编译器",
    "codeInfo2":"认证时间",
    "codeInfo3":"合约代码",
    "codeInfo4":"合约源代码未认证",
    "codeInfo5":"对不起，源代码认证失败!",
    "codeInfo6":"上传源码进行认证",
    "codeInfo7":"源码上传注意事项",
    "codeInfo8":"1.请将源码压缩为一个zip包再进行上传",
    "codeInfo9":"2.压缩包中的文件目录结构和代码需和部署时保持已一致，否则将导致认证不通过",
    "codeInfo10":"对不起，上传的文件不超过5M",
    "codeInfo11":"请求超时请重试",
    "codeInfo12":"对不起，什么都没查到",
    "codeInfo13":"3.zip包中不可包含非Java文件，否则将导致上传认证失败",
  },

  "contractInfo":{
    "contractInfo1":"注销合约",
    "contractInfo2":"交易次数",
    "contractInfo3":"创建者",
    "contractInfo4":"代币",
    "contractInfo5":"交易类型",
    "contractInfo6":"合约方法",
    "contractInfo7":"参数",
    "contractInfo8":"返回类型",
    "contractInfo9":"获取合约详情失败:",
    "contractInfo10":"获取合约详情异常:",
    "contractInfo11":"获取合约交易列表失败:",
    "contractInfo12":"获取合约交易列表异常:",
    "contractInfo13":"验证删除合约失败:",
    "contractInfo14":"contractInfo",
  },

  "bottom": {
    "serviceNode": "服务节点",
    "nodeHeight": "主网/服务节点",
    "agreement": "服务协议",
    "policy": "隐私政策",
    "updateWallet": "更新钱包",
    "Tips": "提示信息",
    "Backstage": "后台运行",
  },

  "TipsType": {
    "undefined": "",
    "1": "检查更新出错",
    "2": "正在检查更新…",
    "3": "检测到新版本，正在下载…",
    "4": "现在使用的就是最新版本，不用更新",
  },
  ...zhLocale
};
export default cn
