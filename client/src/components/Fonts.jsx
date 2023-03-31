import { useFonts } from 'expo-font';

export default function Fonts(){
    const [loaded] = useFonts({
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      });
      if(!loaded){
        return null;
      }
}
