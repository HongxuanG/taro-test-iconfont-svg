import { View, Text } from '@tarojs/components'
import IconFont from '@/components/iconfont/iconfont'
import './index.scss'

export default () => {
  return (
      <View className="index">
        <Text>Hello world!</Text>
        <IconFont name="icon-alipay" size={36} customClassName='' customStyle={{}} color=''></IconFont>
      </View>
    );
}
