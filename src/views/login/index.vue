<template>
  <div class="login">
    <a-row type="flex"
      align="middle"
      justify="center"
      class="login__cont">
      <a-col :span="12"
        class="login__cont__left">
        <div>
          <div>
            <p>用户登录</p>
            <div>
              <div>
                <HomeOutlined />
                使用微信登录
              </div>
              <div>
                <MailOutlined />
                使用微博登录
              </div>
            </div>
          </div>
          <div>
            或者使用电子邮箱注册
          </div>
          <div>
            <!-- 账号 -->
            <a-input placeholder="电子邮箱"
              v-model:value="userName"
              ref="userNameInput">
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
            <!-- 密码 -->
            <a-input-password v-model:value="value"
              placeholder="密码" />
            <!-- 按钮 -->
            <a-button type="primary">
              注册
            </a-button>
          </div>
          <div>
            我同意并遵守服务协议
          </div>
        </div>
      </a-col>
      <a-col :span="12"
        class="login__cont__right">
        <img src="https://www.jq22.com/demo/uidenglumoban202011092031/images/dlbox.svg" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import { HomeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  name: "login",
  components: {
    MailOutlined,
    HomeOutlined,
    UserOutlined,
  },
  setup() {
    const userName = ref("")
    const value = ref("")
    return {
      userName,
      value,
    }
  },
})
</script>
<style lang="scss" scoped>
.login {
  background-color: #f7fafc;
  padding: 100px 200px;

  &__cont {
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    &__left {
      padding: 50px;
    }

    &__right {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      height: calc(100vh - 200px);
      padding: 50px;
      background-color: #ebf4ff;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
