<template>
   <div class="Migrate">
       <h3 class='title'>{{ $t('nav.migrate') }}</h3>
       <div class='Migrate-cen'>
            <el-row :gutter="20">
                <el-col :span="12" :offset="6">
                    <div class="onee grid-content bg-purple">
                        <div>
                            <p>{{ $t('migrate.address') }}：</p>    
                            <div>
                                <el-input v-model='Address'></el-input>
                                <el-button @click='getNewAddress()' size='mini' type="primary">{{ $t('migrate.getNewAddress') }}</el-button>
                            </div>
                        </div>    
                        <div>
                            <p>{{ $t('migrate.newAddress') }}：</p>    
                            <div>
                                <el-input v-model='NewAddress' disabled></el-input>
                                <el-button id='CopyAddress' :data-clipboard-text="NewAddress" @click='CopyNewAddress()' size='mini' type="primary">{{ $t('migrate.copyNewAddress') }}</el-button>
                            </div>
                        </div> 
                        <div class="tip bg-gray">
                            <p><i></i>{{$t('migrate.msg1')}}</p>
                            <p><i></i>{{$t('migrate.msg2')}}</p>
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
            this.$post('/','/addressSwap',{
                tSamoAddress : this.Address
            }).then( (res) => {
                console.log(res);
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
        height: 400px;
        background: white;
        border: 1px solid #ddd;
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        margin: 0 auto 60px;
        padding: 60px 0;
        .onee{
            height: 100%;
            >div{
                margin-bottom: 20px;
                >div{
                    display: flex;
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