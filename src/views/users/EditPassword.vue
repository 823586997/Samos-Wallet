<template>
  <div class="new_address bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <BackBar :backTitle="$t('address.address0')"></BackBar>
        <h3 class="title">{{$t('editPassword.editPassword0')}}</h3>
      </div>
    </div>
    <div class="new w1200 mt_20 bg-white">
      <div class="w630">
        <h3 class="tc mzt_20">{{this.$route.query.address}}</h3>
        <el-form :model="passwordForm" status-icon :rules="passwordRules" ref="passwordForm" class="mb_20">
          <el-form-item :label="$t('editPassword.editPassword1')" prop="oldPass">
            <el-input type="password" v-model="passwordForm.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('editPassword.editPassword2')" prop="newPass">
            <el-input type="password" v-model="passwordForm.newPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('editPassword.editPassword3')" prop="checkPass">
            <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="form-next">
            <el-button type="success" @click="submitPasswordForm('passwordForm')">{{$t('editPassword.editPassword4')}}
            </el-button>
            <div>{{$t('editPassword.editPassword5')}}<span class="click" @click="toUrl('importAddress')">重新导入</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import BackBar from '@/components/BackBar'
  import {addressInfo} from '@/api/util'

  export default {
    data() {
      let validateOldPass = (rule, value, callback) => {
        let patrn = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
        if (value === '') {
          callback(new Error(this.$t('editPassword.editPassword6')));
        } else if (!patrn.exec(value)) {
          callback(new Error(this.$t('editPassword.editPassword7')));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('newPass');
          }
          callback();
        }
      };
      let validateNewPass = (rule, value, callback) => {
        let patrn = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
        if (value === '') {
          callback(new Error(this.$t('editPassword.editPassword8')));
        } else if (!patrn.exec(value)) {
          callback(new Error(this.$t('editPassword.editPassword7')));
        } else if (this.passwordForm.oldPass === this.passwordForm.newPass) {
          callback(new Error(this.$t('editPassword.editPassword9')));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validateChechPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('editPassword.editPassword10')));
        } else if (this.passwordForm.checkPass !== this.passwordForm.newPass) {
          callback(new Error(this.$t('editPassword.editPassword11')));
        } else {
          callback();
        }
      };
      return {
        addressInfo: {},//默认账户信息
        passwordForm: {
          oldPass: '',
          newPass: '',
          checkPass: '',
        },
        passwordRules: {
          oldPass: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          newPass: [
            {validator: validateNewPass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateChechPass, trigger: 'blur'}
          ]
        },
        editAddressInfo: '',//新建的地址信息
      };
    },
    created() {
    },
    mounted() {
    },
    components: {
      BackBar
    },
    methods: {

      /**
       * 修改密码
       * @param formName
       */
      submitPasswordForm(formName) {
        let address = this.$route.query.address;
        let oldAddressInfo ={};
        for(let item of addressInfo(0)){
          if(item.address === address){
             oldAddressInfo = item
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const pri = nuls.decrypteOfAES(oldAddressInfo.aesPri, this.passwordForm.oldPass);
            const newAddressInfo = nuls.importByKey(2, pri, this.passwordForm.oldPass);
            if (newAddressInfo.address === address) {
              const importAddressInfo = nuls.importByKey(2, pri, this.passwordForm.newPass);
              oldAddressInfo.aesPri = importAddressInfo.aesPri;
              oldAddressInfo.pub = importAddressInfo.pub;
              localStorage.setItem(oldAddressInfo.address, JSON.stringify(oldAddressInfo));
              //sessionStorage.setItem(importAddressInfo.address, JSON.stringify(newAddressInfo));
              this.$message({message: this.$t('editPassword.editPassword12'), type: 'success', duration: 1000});
              this.toUrl("address");
            } else {
              this.$message({message: this.$t('editPassword.editPassword13'), type: 'error', duration: 1000});
            }
          } else {
            return false;
          }
        });
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        if (name === 'importAddress') {
          this.$router.push({
            name: name,
            query: {address: this.$route.query.address}
          })
        } else {
          this.$router.push({
            name: name,
          })
        }

      },
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .new_address {
    .new {
      border: @BD1;
      .step {
        height: 50px;
        margin: 100px 140px 0 140px;
        li {
          float: left;
          width: 20%;
          height: 50px;
          text-align: center;
          .dotted {
            margin: 20px 0 0 0;
            border-bottom: 2px dotted @Dcolour;
          }
          .Ndotted {
            border-bottom-color: @Ccolour;
          }
          .Ncolor {
            color: @Ccolour;
          }
          .ico {
            i {
              font-size: 30px;
            }
          }
        }

      }
      .tip {
        margin: 40px auto;
        padding: 20px 30px;
        p {
          i {
            width: 5px;
            height: 5px;
            display: block;
            float: left;
            margin: 9px 10px 0 0;
            border-radius: 5px;
            background: #000000;
          }
        }
      }
      .step_tow {
        .title {
          height: 30px;
          line-height: 30px;
          margin: 40px auto 0;
        }
        .tip {
          margin: 40px auto;
        }
        .btn {
          .el-button--info {
            margin: 50px 0 20px 0 !important;
          }
        }
      }
    }
  }

</style>
