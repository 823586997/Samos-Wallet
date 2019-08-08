<template>
   <div class="Migrate">
       <h3 class='title'>{{ $t('migrate.title') }}</h3>
       <div class='Migrate-cen'>
            <el-row :gutter="20">
                <el-col :span="12" :offset="6">
                    <div class="onee grid-content bg-purple">
                        <div>
                            <p>{{ $t('migrate.address') }}：</p>    
                            <div>
                                <form>
                                    <el-input v-model='Address'></el-input>
                                    <el-button @click='getNewAddress()' size='mini' type="primary">{{ $t('migrate.getNewAddress') }}</el-button>
                                </form>
                            </div>
                        </div>    
                        <div>
                            <p>{{ $t('migrate.newAddress') }}：</p>    
                            <div>
                                <form>
                                    <el-input v-model='NewAddress' disabled></el-input>
                                    <el-button id='CopyAddress' :data-clipboard-text="NewAddress" @click='CopyNewAddress()' size='mini' type="primary">{{ $t('migrate.copyNewAddress') }}</el-button>
                                </form>
                            </div>
                        </div> 
                        <div class="tip bg-gray">
                            <p>{{$t('migrate.msg1')}}</p>
                            <p>{{$t('migrate.msg2')}}</p>
                            <p>{{$t('migrate.msg3')}}</p>
                            <p>{{$t('migrate.msg4')}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
       </div>
   </div>
</template>

<script>
// 复制地址插件
import Clipboard from 'clipboard';
import axios from 'axios';
import { JSEncrypt } from 'jsencrypt';
export default {
    name: '',
    data() {
        return {
            Address:'',
            NewAddress:''
        }
    },
    methods:{
        getNewAddress(){
            // 秘钥
            let publicKey = "-----BEGIN RSA PRIVATE KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBJ+aNypoRdXWmbSQx+K7U5At40jfOfW8JxhlZH5Cy8FbT5+OY//Wwau+q/IpiAZBEORiwsMoqkmVvK2SH0k08UH2T/p6dnmloTsEN/q+VI1kV58bzAG2Sr0v7urDQHXkg21V46PM+tIJUNuFXa6APQujmoZfG1PPICtOM/nhAwQIDAQAB-----END RSA PRIVATE KEY-----"
            // 加密
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);
            let Address = encrypt.encrypt(this.Address);
            // form 请求
            event.preventDefault();
            let formData = new FormData();
            formData.append("NulsAddress",Address);
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            // 创建axios实例
            let api = axios.create({
                baseURL: 'http://wallet.samos.io/', // 请求的域名
                timeout: 1000, // 设置请求的超时时长，超过时长报401超时
            })
            let url = '/addressSwap';
            api.post(url,formData,config)
            .then( (res) => {
                let data = res.data;
                if( data.code == 0 ){
                    this.NewAddress = data.data.samos;
                }else{
                    this.$message({
                        message: data.msg
                    })
                }
            })
        },
        CopyNewAddress(){
            var clipboard = new Clipboard('#CopyAddress');
            clipboard.on('success', e => {
                this.$message({
                    message:'复制成功'
                })
                // 释放内存
                clipboard.destroy();
            })
            clipboard.on('error', e => {
                this.$message({
                    message:'复制失败'
                })
                // 释放内存
                clipboard.destroy();
            })
        }
    }
}
</script>

<style scoped lang='less'>
@import "./../../assets/css/style";
.Migrate{
    width: 100%;
    height: 100%;
    position: relative;
    .Migrate-cen{
        width: 1200px;
        // height: 430px;
        background: white;
        border: 1px solid #ddd;
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        margin: 0 auto 60px;
        padding: 60px 30px 0 0;
        .onee{
            height: 100%;
            >div{
                margin-bottom: 20px;
                >div{
                    form{
                       display: flex; 
                    }
                    
                }
                p{
                    font-size: 14px;
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
        }
    }
}

</style>
<style lang='less'>
.migrate{
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>