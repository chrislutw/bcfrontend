import { Message } from 'element-ui'

export default function({ store, redirect, req, $auth }) {
  const user = !!$auth.$storage.getState('userInfo')
  const token = !!$auth.$storage.getState('token')
  if (!user && !token) {
    Message({
      message: `您尚未登入，請點擊右上登入`,
      type: 'error'
    })
    return redirect('/')
  }
}
