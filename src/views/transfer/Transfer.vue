<template>
  <div class="transfer bg-gray">
    <h3 class="title">{{changeAssets.account}} {{$t('nav.transfer')}}</h3>
    <div class="w1200 bg-white">
      <el-form :model="transferForm" :rules="transferRules" ref="transferForm">
        <el-form-item :label="$t('transfer.transfer0')">
          <el-input v-model.trim="transferForm.fromAddress" disabled>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('transfer.transfer1')" prop="toAddress">
          <el-input v-model.trim="transferForm.toAddress" @change="changeParameter">
            <i class="iconfont iconlianxiren click" slot="suffix" @click="showBook" v-show="false"></i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('transfer.transfer2')">
          <el-select v-model="transferForm.type" @change="changeType">
            <el-option
                    v-for="item in assetsList"
                    :key="item.type === 1 ? item.chainId : item.contractAddress"
                    :label="item.symbol"
                    :disabled="isCross && item.type === 2"
                    :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="cross yellow font12" v-show="isCross">
          {{$t('transfer.transfer15')}}
        </div>
        <el-form-item :label="$t('transfer.transfer3')" prop="amount">
          <span class="balance font12 fr">{{$t('public.usableBalance')}}: {{changeAssets.balance}}</span>
          <el-input v-model="transferForm.amount" @change="changeParameter">
          </el-input>
        </el-form-item>
        <div class="div-senior" v-show="changeAssets.type !== 1">
          <el-form-item :label="$t('call.call3')" class="senior">
            <el-switch v-model="transferForm.senior">
            </el-switch>
          </el-form-item>
          <div class="senior-div" v-if="transferForm.senior">
            <el-form-item label="Gas Limit" prop="gas">
              <el-input v-model="transferForm.gas" @change="changeGas">
              </el-input>
              <div class="font12 yellow" v-show="gasTips">{{$t('call.call10')}}</div>
            </el-form-item>
            <el-form-item label="Price" prop="price">
              <el-input v-model="transferForm.price">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="cb"></div>
        <el-form-item :label="$t('transfer.transfer4')">
          <el-input type="textarea" v-model="transferForm.remarks" maxlength="100" show-word-limit>
          </el-input>
        </el-form-item>
        <div class="font14">
          <el-tooltip placement="top">
            <div slot="content">{{$t('transfer.transfer5')}}</div>
            <i class="el-icon-warning"></i>
          </el-tooltip>
          {{$t('public.fee')}}: {{fee}}
          <span class="fCN">{{isCross ? 'SAMO': changeAssets.symbol}}</span>
        </div>
        <el-form-item class="form-next">
          <el-button type="success" @click="submitForm('transferForm')" :disabled="isNext">{{$t('public.next')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
    <el-dialog :title="$t('transfer.transfer6')" :visible.sync="transferVisible" width="40rem" class="confirm-dialog">
      <div class="bg-white">
        <div class="div-data">
          <p>{{$t('transfer.transfer0')}}&nbsp;</p>
          <label>{{transferForm.fromAddress}}</label>
        </div>
        <div class="div-data">
          <p>{{$t('transfer.transfer1')}}&nbsp;</p>
          <label>{{transferForm.toAddress}}</label>
        </div>
        <div class="div-data">
          <p>{{$t('public.fee')}}: &nbsp;</p>
          <label>{{fee}} <span class="fCN">{{changeAssets.symbol}}</span></label>
        </div>
        <div class="div-data">
          <p>{{$t('tab.tab6')}}:&nbsp;</p>
          <label class="yellow">{{transferForm.amount}} <span class="fCN">{{changeAssets.account}}</span></label>
        </div>
        <div class="div-data">
          <p>{{$t('transfer.transfer4')}}&nbsp;</p>
          <label>{{transferForm.remarks}}</label>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferVisible = false">{{$t('transfer.transfer7')}}</el-button>
        <el-button type="success" @click="confirmTraanser">{{$t('transfer.transfer8')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import nuls from 'nuls-sdk-js'
  import sdk from 'nuls-sdk-js/lib/api/sdk'
  import utils from 'nuls-sdk-js/lib/utils/utils'
  import {
    isMainNet,
    countCtxFee,
    getNulsBalance,
    countFee,
    inputsOrOutputs,
    validateAndBroadcast
  } from '@/api/requestData'
  import * as config from '@/config.js'
  import {Times, Power, Plus, timesDecimals, addressInfo} from '@/api/util'
  import Password from '@/components/PasswordBar'

  export default {

    data() {
      let validateToAddress = (rule, value, callback) => {
        let patrn = /^(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{20,50}$/;
        if (value === '') {
          callback(new Error(this.$t('transfer.transfer9')))
        } else if (!patrn.exec(value)) {
          callback(new Error(this.$t('transfer.transfer10')))
        } else {
          callback()
        }
      };
      let validateAmount = (rule, value, callback) => {
        let patrn = /^([1-9][\d]{0,72}|0)(\.[\d]{1,72})?$/;
        if (value === '') {
          callback(new Error(this.$t('transfer.transfer11')))
        } else if (!patrn.exec(value)) {
          callback(new Error(this.$t('transfer.transfer12')))
        } else if (parseFloat(value) < 0.001) {
          callback(new Error(this.$t('transfer.transfer13')))
        } else {
          setTimeout(() => {
            if (Number(value) > Number(this.changeAssets.balance)) {
              callback(new Error(this.$t('transfer.transfer14')))
            } else {
              callback()
            }
          }, 200);
          //callback();
        }
      };
      let validateGas = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('deploy.deploy8')));
        } else if (value < 1 || value > 10000000) {
          callback(new Error(this.$t('deploy.deploy81')));
        } else {
          callback();
        }
      };
      let validatePrice = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('deploy.deploy9')));
        } else if (value < 1) {
          callback(new Error(this.$t('deploy.deploy91')));
        } else {
          callback();
        }
      };

      return {
        addressInfo: '', //默认账户信息
        balanceInfo: '',//账户余额信息
        assetsList: [],//账户资产列表
        changeAssets: {},//选择的资产信息
        gasNumber: 0,//消耗的gas
        oldGasNumber: 0,//默认的gas
        gasTips: false,//gas 太小提示信息
        transferForm: {
          fromAddress: '',
          toAddress: '',
          type: this.$route.query.accountType ? this.$route.query.accountType : 'SAMO',
          amount: '',
          senior: false,
          gas: this.gasNumber,
          price: sdk.CONTRACT_MINIMUM_PRICE,
          remarks: '',
        },//转账数据
        transferRules: {
          toAddress: [
            {validator: validateToAddress, trigger: ['blur', 'change']}
          ],
          amount: [
            {validator: validateAmount, trigger: ['blur', 'change']}
          ],
          gas: [
            {validator: validateGas, trigger: ['blur', 'change']}
          ],
          price: [
            {validator: validatePrice, trigger: 'blur'}
          ],
        }, //验证信息
        fee: 0.001, //手续费
        transferVisible: false,//转账确认弹框
        isCross: false,//是否跨链交易
        isNext: false,//是否可用点击下一步
      };
    },
    created() {
      this.addressInfo = addressInfo(1);
      setInterval(() => {
        this.addressInfo = addressInfo(1);
      }, 500);
      this.transferForm.fromAddress = this.addressInfo.address;
      this.getCapitalListByAddress(this.transferForm.fromAddress);
    },
    mounted() {
    },
    watch: {
      addressInfo(val, old) {
        if (val.address !== old.address && old.address) {
          this.transferForm.fromAddress = this.addressInfo.address;
          this.getCapitalListByAddress(this.transferForm.fromAddress);
          this.changeParameter();
        }
      },
      gasNumber(val, old) {
        if (old && this.oldGasNumber > val) {
          this.gasTips = true
        } else {
          this.gasTips = false
        }
      }
    },
    components: {
      Password,
    },
    methods: {

      /**
       * 获取地址的资金列表
       * @param address
       **/
      async getCapitalListByAddress(address) {
        this.assetsList = [];
        //获取本连的基本资产
        let basicAssets = [];
        let chainId = 2; //记录主链id
        await this.$post('/', 'getAccountLedgerList', [address])
          .then((response) => {
            //console.log(response.result);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result) {
                basicAssets.push({
                  type: 1,
                  symbol: item.symbol,
                  chainId: item.chainId,
                  assetId: item.assetId,
                  balance: timesDecimals(item.balance)
                });
                chainId = item.chainId;
              }
            }
          })
          .catch((error) => {
            console.log("getAccountLedgerList:" + error);
            this.assetsListLoading = false;
          });
        ///console.log(basicAssets);

        //获取本连的合约资产
        let contractAssets = [];
        await this.$post('/', 'getAccountTokens', [1, 100, address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let itme of response.result.list) {
                contractAssets.push({
                  type: 2,
                  symbol: itme.tokenSymbol,
                  chainId: chainId,
                  balance: timesDecimals(itme.balance, itme.decimals),
                  contractAddress: itme.contractAddress,
                  decimals: itme.decimals
                })

              }
            }
          })
          .catch((error) => {
            console.log("getAccountTokens:" + error);
          });
        //console.log(contractAssets);

        //获取跨链的基本资产
        let crossAssets = [];
        await this.$post('/', 'getAccountCrossLedgerList', [address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result) {
                crossAssets.push({
                  type: 1,
                  symbol: item.symbol,
                  chainId: item.chainId,
                  assetId: item.assetId,
                  //TODO 默认为8的进度系数 待完善
                  balance: timesDecimals(item.balance)
                })
              }
            }
          })
          .catch((err) => {
            console.log("getAccountCrossLedgerList:" + err);
          });
        //console.log(crossAssets);

        this.assetsList = [...basicAssets, ...contractAssets, ...crossAssets];
        let isNuls = false; //是否有nuls资产
        for (let item of this.assetsList) {
          if (item.symbol === 'SAMO') {
            isNuls = true
          }
        }
        //没有nuls 资产 添加一个为nuls资产
        if (!isNuls) {
          let newNulsAssets = {
            type: 1,
            symbol: 'SAMO',
            chainId: 2,
            assetId: 1,
            balance: 0
          };
          this.assetsList.unshift(newNulsAssets);
        }
        //console.log(this.assetsList);
        this.changeNuls(0);
      },

      /**
       * 验证参数
       **/
      changeParameter() {
        //判断转出地址是否为其他链地址 如果有就为跨链交易
        if (this.transferForm.toAddress) {
          let fromAddress = nuls.verifyAddress(this.transferForm.fromAddress);
          let toAddress = nuls.verifyAddress(this.transferForm.toAddress);
          if (fromAddress.chainId === toAddress.chainId) {
            this.isCross = false;
            this.fee = 0.001;
          } else {
            this.isCross = true;
            this.fee = 0.01;
            //跨链交易默认选中NULS
            if (this.changeAssets.type === 2) {
              this.changeNuls();
            }
            //跨链交易判断本资产及NULS是否够手续费
            for (let item of this.assetsList) {
              //判断nuls资产是否够手续费
              let isNulsFee = item.symbol === "SAMO" && Number(item.balance) < 0.01;
              //判断本链资产是否够手续费
              let isChainFee = chainID() === item.chainId && Number(item.balance) < 0.01;
              if (isNulsFee) {
                this.isNext = false;
                this.$message({message: this.$t('transfer.transfer16'), type: 'error', duration: 2000});
              } else if (isChainFee) {
                this.isNext = false;
                this.$message({message: this.$t('transfer.transfer17'), type: 'error', duration: 2000});
              } else {
                this.isNext = true;
              }
            }
          }
        }
        //合约地址转账交易
        if (this.changeAssets.type !== 1) {
          this.transferForm.gas = sdk.CONTRACT_MAX_GASLIMIT;
          this.$refs['transferForm'].validate((valid) => {
            if (valid) {
              let gasLimit = sdk.CONTRACT_MAX_GASLIMIT;
              let price = this.transferForm.price;
              let contractAddress = this.changeAssets.contractAddress;
              let methodName = 'transfer';
              let methodDesc = '';
              let args = [this.transferForm.toAddress, Number(Times(this.transferForm.amount, Number(Power(this.changeAssets.decimals))))];
              this.validateContractCall(this.addressInfo.address, 0, gasLimit, price, contractAddress, methodName, methodDesc, args);
            } else {
              return false;
            }
          });
        } else {
          this.$refs['transferForm'].validate();
        }
      },

      /**
       * 资产类型选择
       * @param type
       **/
      changeType(type) {
        //console.log(type);
        this.changeParameter();
        if (type.type === 1) {
          this.transferForm.gas = 5000;
          this.transferForm.price = 25;
        } else {
          this.transferForm.gas = 0;
          this.transferForm.price = sdk.CONTRACT_MINIMUM_PRICE;
        }
        this.changeAssets = type;
        this.transferForm.type = type.symbol;
      },

      /**
       *  默认资产类型
       * @param type 0：首次进入加载 1：填写地址以后判断默认为nuls
       **/
      changeNuls(type = 1) {
        let defaultType = 'SAMO';
        if (type === 0) {
          if (this.$route.query.accountType) {
            defaultType = this.$route.query.accountType
          }
        }
        for (let item of this.assetsList) {
          if (item.symbol === defaultType) {
            this.changeAssets = item;
            this.transferForm.type = item.symbol;
          }
        }
      },

      /**
       * 转账功能下一步
       * @param formName
       */
      submitForm(formName) {
        console.log( this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.transferVisible = true
          } else {
            return false;
          }
        });
      },

      /**
       * 弹框确认提交
       **/
      async confirmTraanser() {
        this.getNulsBalance(this.changeAssets.chainId, 1, this.transferForm.fromAddress);
        this.$refs.password.showPassword(true);
      },

      /**
       * 获取转出地址余额信息
       *  @param assetChainId
       *  @param assetId
       *  @param address
       **/
      async getNulsBalance(assetChainId, assetId, address) {
        await getNulsBalance(assetChainId, assetId, address).then((response) => {
          //console.log(response);
          if (response.success) {
            this.balanceInfo = response.data;
          } else {
            this.$message({message: this.$t('public.err') + response, type: 'error', duration: 1000});
          }
        }).catch((error) => {
          this.$message({message: this.$t('public.err0') + error, type: 'error', duration: 1000});
        });
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        const pri = nuls.decrypteOfAES(this.addressInfo.aesPri, password);
        const newAddressInfo = nuls.importByKey(this.addressInfo.chainId, pri, password);
        let crossTxHex = '';
        if (newAddressInfo.address === this.addressInfo.address) {
          let transferInfo = {
            fromAddress: this.transferForm.fromAddress,
            assetsChainId: this.changeAssets.chainId,
            assetsId: 1,
            fee: 10000
          };
          let inOrOutputs = {};
          let tAssemble = [];
          if (this.changeAssets.type === 1 && !this.isCross) {
            transferInfo['toAddress'] = this.transferForm.toAddress;
            transferInfo['amount'] = Number(Times(this.transferForm.amount, 100000000).toString());
            inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 2);
            //交易组装
            tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, this.transferForm.remarks, 2);
          } else if (this.changeAssets.type === 1 && this.isCross) {
            transferInfo['toAddress'] = this.transferForm.toAddress;
            transferInfo['amount'] = Number(Times(this.transferForm.amount, 100000000).toString());
            transferInfo['remark'] = this.transferForm.remarks;
            transferInfo.fee = 1000000;
            crossTxHex = await this.crossTxhexs(pri, this.addressInfo.pub, this.addressInfo.chainId, transferInfo);
          } else {
            transferInfo['amount'] = Number(Plus(0, Number(Times(this.transferForm.gas, this.transferForm.price))));
            inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 16);
            tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, this.transferForm.remarks, 16, this.contractCallData);
          }

          //交易签名
          let txhex = "";
          if (this.changeAssets.type === 1 && this.isCross) {
            txhex = crossTxHex;
          } else {
            //获取手续费
            let newFee = countFee(tAssemble, 1);
            //手续费大于0.001的时候重新组装交易及签名
            if (transferInfo.fee !== newFee) {
              transferInfo.fee = newFee;
              if (this.changeAssets.type === 1) {
                inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 2);
                tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, this.transferForm.remarks, 2);
              } else {
                inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 16);
                tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, this.transferForm.remarks, 16, this.contractCallData);
              }
              txhex = await nuls.transactionSerialize(nuls.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub, tAssemble);
            } else {
              txhex = await nuls.transactionSerialize(nuls.decrypteOfAES(this.addressInfo.aesPri, password), this.addressInfo.pub, tAssemble);
            }
          }
          //console.log(txhex);
          //验证并广播交易
          await validateAndBroadcast(txhex).then((response) => {
            //console.log(response);
            if (response.success) {
              this.toUrl("txList");
            } else {
              this.$message({message: this.$t('error.' + response.data.code), type: 'error', duration: 3000});
            }
          }).catch((err) => {
            this.$message({message: this.$t('public.err1') + err, type: 'error', duration: 1000});
          });
        } else {
          this.$message({message: this.$t('address.address13'), type: 'error', duration: 1000});
        }
      },

      /**
       *  跨链交易签名
       * @param pri
       * @param pub
       * @param chainId
       * @param transferInfo
       **/
      async crossTxhexs(pri, pub, chainId, transferInfo) {
        //账户转出资产余额
        const balanceInfo = await getNulsBalance(transferInfo.assetsChainId, transferInfo.assetsId, transferInfo.fromAddress);
        let inputs = [];
        let outputs = [{
          address: transferInfo.toAddress ? transferInfo.toAddress : transferInfo.fromAddress,
          assetsChainId: transferInfo.assetsChainId,
          assetsId: transferInfo.assetsId,
          amount: transferInfo.amount,
          lockTime: 0
        }];
        let mainNetBalanceInfo = await getNulsBalance(2, 1, transferInfo.fromAddress);
        let localBalanceInfo;
        //如果不是主网需要收取NULS手续费
        if (!isMainNet(chainId)) {
          if (mainNetBalanceInfo.data.balance < transferInfo.fee) {
            console.log("余额不足");
            return;
          }
        }
        //如果转出资产为本链主资产，则直接将手续费加到转出金额上
        if (chainId === transferInfo.assetsChainId && transferInfo.assetsId === 1) {
          let newAmount = transferInfo.amount + transferInfo.fee;
          if (balanceInfo.data.balance < transferInfo.amount + transferInfo.fee) {
            console.log("余额不足");
            return;
          }
          //转出的本链资产 = 转出资产amount + 本链手续费
          inputs.push({
            address: transferInfo.fromAddress,
            assetsChainId: transferInfo.assetsChainId,
            assetsId: transferInfo.assetsId,
            amount: newAmount,
            locked: 0,
            nonce: balanceInfo.data.nonce
          });
          //如果不是主网需收取主网NULS手续费
          if (!isMainNet(chainId)) {
            inputs.push({
              address: transferInfo.fromAddress,
              assetsChainId: 2,
              assetsId: 1,
              amount: transferInfo.fee,
              locked: 0,
              nonce: mainNetBalanceInfo.data.nonce
            });
          }
        } else {
          localBalanceInfo = await getNulsBalance(chainId, 1, transferInfo.fromAddress);
          if (localBalanceInfo.data.balance < transferInfo.fee) {
            console.log("该账户本链主资产不足够支付手续费！");
            return;
          }
          //如果转出的是NULS，则需要把NULS手续费添加到转出金额上
          if (transferInfo.assetsChainId === 2 && transferInfo.assetsId === 1) {
            let newAmount = transferInfo.amount + transferInfo.fee;
            if (mainNetBalanceInfo.data.balance < newAmount) {
              console.log("余额不足");
              return;
            }
            inputs.push({
              address: transferInfo.fromAddress,
              assetsChainId: transferInfo.assetsChainId,
              assetsId: transferInfo.assetsId,
              amount: newAmount,
              locked: 0,
              nonce: mainNetBalanceInfo.data.nonce
            });
          } else {
            inputs.push({
              address: transferInfo.fromAddress,
              assetsChainId: transferInfo.assetsChainId,
              assetsId: transferInfo.assetsId,
              amount: transferInfo.amount,
              locked: 0,
              nonce: balanceInfo.data.nonce
            });
            inputs.push({
              address: transferInfo.fromAddress,
              assetsChainId: 2,
              assetsId: 1,
              amount: transferInfo.fee,
              locked: 0,
              nonce: mainNetBalanceInfo.data.nonce
            });
          }
          //本链主资产手续费
          if (!isMainNet(chainId)) {
            inputs.push({
              address: transferInfo.fromAddress,
              assetsChainId: chainId,
              assetsId: 1,
              amount: transferInfo.fee,
              locked: 0,
              nonce: localBalanceInfo.data.nonce
            });
          }
        }
        let tAssemble = await nuls.transactionAssemble(inputs, outputs, transferInfo.remark, 10);//交易组装
        let ctxSign = "";//本链协议交易签名
        let mainCtxSign = "";//主网协议交易签名
        const txs = require('nuls-sdk-js/lib/model/txs');
        const Serializers = require("nuls-sdk-js/lib/api/serializers");
        let bw = new Serializers();
        let mainCtx = new txs.CrossChainTransaction();
        let pubHex = Buffer.from(pub, 'hex');
        let newFee = 0;
        if (isMainNet(chainId)) {
          newFee = countCtxFee(tAssemble, 1)
        } else {
          newFee = countCtxFee(tAssemble, 2);
          mainCtx.time = tAssemble.time;
          mainCtx.remark = tAssemble.remark;
          let mainNetInputs = [];
          if (transferInfo.assetsChainId === 2 && transferInfo.assetsId === 1) {
            mainNetInputs.push({
              address: transferInfo.fromAddress,
              assetsChainId: transferInfo.assetsChainId,
              assetsId: transferInfo.assetsId,
              amount: transferInfo.amount + newFee,
              locked: 0,
              nonce: mainNetBalanceInfo.data.nonce
            });
          } else {
            mainNetInputs = [{
              address: transferInfo.fromAddress,
              assetsChainId: transferInfo.assetsChainId,
              assetsId: transferInfo.assetsId,
              amount: transferInfo.amount,
              locked: 0,
              nonce: balanceInfo.data.nonce
            }, {
              address: transferInfo.fromAddress,
              assetsChainId: 2,
              assetsId: 1,
              amount: newFee,
              locked: 0,
              nonce: mainNetBalanceInfo.data.nonce
            }];
          }
          mainCtx.setCoinData(mainNetInputs, outputs);
        }
        //如果手续费发生改变，重新组装CoinData
        if (transferInfo.fee !== newFee) {
          if (chainId === transferInfo.assetsChainId && transferInfo.assetsId === 1) {
            if (balanceInfo.data.balance < transferInfo.amount + newFee) {
              console.log("余额不足");
              return;
            }
            inputs[0].amount = transferInfo.amount + newFee;
            if (!isMainNet(chainId)) {
              inputs[1].amount = newFee;
            }
          } else {
            if (localBalanceInfo.data.balance < transferInfo.fee) {
              console.log("该账户本链主资产不足够支付手续费！");
              return;
            }
            if (transferInfo.assetsChainId === 2 && transferInfo.assetsId === 1) {
              if (mainNetBalanceInfo.data.balance < transferInfo.amount + newFee) {
                console.log("余额不足");
                return;
              }
              inputs[0].amount = transferInfo.amount + newFee;
              inputs[1].amount = newFee;
            } else {
              inputs[1].amount = newFee;
              inputs[2].amount = newFee;
            }
          }
          tAssemble = await nuls.transactionAssemble(inputs, outputs, transferInfo.remark, 10);
          ctxSign = nuls.transactionSignature(pri, tAssemble);
        } else {
          ctxSign = nuls.transactionSignature(pri, tAssemble);
        }
        bw.writeBytesWithLength(pubHex);
        bw.writeBytesWithLength(ctxSign);
        if (!isMainNet()) {
          mainCtx.txData = tAssemble.getHash();
          mainCtxSign = nuls.transactionSignature(pri, mainCtx);
          bw.writeBytesWithLength(pubHex);
          bw.writeBytesWithLength(mainCtxSign);
        }
        tAssemble.signatures = bw.getBufWriter().toBuffer();
        return tAssemble.txSerialize().toString('hex');
      },

      /**
       * 验证调用合约交易
       * @param sender
       * @param value
       * @param gasLimit
       * @param price
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async validateContractCall(sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args) {
        return await this.$post('/', 'validateContractCall', [sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              //return {success: true, data: response.result};
              this.imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args)
            } else {
              console.log("验证调用合约交易错误");
            }
          })
          .catch((error) => {
            console.log("验证调用合约交易异常" + error);
          });
      },

      /**
       * 预估调用合约交易的gas
       * @param sender
       * @param value
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args) {
        return await this.$post('/', 'imputedContractCallGas', [sender, value, contractAddress, methodName, methodDesc, args])
          .then((response) => {
            if (response.hasOwnProperty("result")) {
              this.gasNumber = response.result.gasLimit;
              this.oldGasNumber = response.result.gasLimit;
              this.transferForm.gas = response.result.gasLimit;
              let contractConstructorArgsTypes = this.getContractMethodArgsTypes(contractAddress, methodName);
              let newArgs = utils.twoDimensionalArray(args, contractConstructorArgsTypes);
              this.contractCallData = {
                chainId: config.API_CHAIN_ID,
                sender: sender,
                contractAddress: contractAddress,
                value: value,
                gasLimit: this.transferForm.gas,
                price: this.transferForm.price,
                methodName: methodName,
                methodDesc: methodDesc,
                args: newArgs
              };
            } else {
              console.log("预估调用合约交易的gas错误");
            }
          })
          .catch((error) => {
            console.log("预估调用合约交易的gas异常" + error);
          });
      },

      /**
       * 获取合约指定函数的参数类型
       * @param contractAddress
       * @param methodName
       * @returns
       */
      async getContractMethodArgsTypes(contractAddress, methodName) {
        return await this.$post('/', 'getContractMethodArgsTypes', [contractAddress, methodName])
          .then((response) => {
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result};
            } else {
              return {success: false, data: response.error};
            }
          })
          .catch((error) => {
            return {success: false, data: error};
          });
      },

      /**
       * gas 值改变
       **/
      changeGas(e) {
        this.gasNumber = Number(e);
      },

      /**
       * 通讯录功能
       * TODO 待开发...
       **/
      showBook() {
        this.$message({message: "开发者......", duration: 1000});
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        //console.log(name)
        this.$router.push({
          name: name
        })
      },
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .transfer {
    .w1200 {
      border: @BD1;
      margin: -20px auto 0;
      border-radius: 2px;
      .el-form {
        width: 600px;
        margin: 50px auto 100px;
        .el-form-item {
          .el-form-item__content {
            .el-select {
              width: 100%;
              .el-input__inner {
                width: 100%;
              }
            }
            .balance {
              margin: 10px 0 0 0;
            }
            .el-textarea {
              .el-input__count {
                background: transparent;
                bottom: -10px;
              }
            }
          }
        }
        .div-senior {
          margin: -15px 0 0 0;
          .senior {
            margin: 0 0 0 0;
            .el-form-item__label {
              line-height: 40px;
              position: relative;
              left: 500px;
              float: left;
            }
            .el-form-item__content {
              text-align: right;
              .el-switch {
                .el-switch__core {
                }
              }
            }
          }
          .senior-div {
            margin: 0 0 25px 0;
            .el-form-item {
              margin: 0 0 5px 0;
              .el-form-item__label {
                line-height: 24px;
              }
            }
          }
        }
        .cross {
          margin: -14px 0 8px 0;
        }
      }
    }
  }

</style>
