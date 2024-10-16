import LoginScreen from './LoginScreen';
import SplashScreen from './SplashScreen';
import {useState, useEffect} from 'react';

export default function SplashMoving() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  });
  return <>{isShowSplashScreen ? <SplashScreen /> : <LoginScreen />}</>;
}
