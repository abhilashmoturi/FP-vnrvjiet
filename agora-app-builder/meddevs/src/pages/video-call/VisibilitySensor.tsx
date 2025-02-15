import React, {useEffect, useState, useRef, ReactNode, FC} from 'react';
import {View, Dimensions} from 'react-native';

export interface IDimensionData {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
}

export interface Props {
  /** Function that is triggered when component enters the viewport */
  onChange(visible: boolean): any;
  /** The component that needs to be in the viewport */
  children: ReactNode;
  trigger: any;
}

const RNView = View as any;

const VisibilitySensor: FC<Props> = ({children, onChange, trigger}) => {
  const myView: any = useRef(null);
  const [lastValue, setLastValue] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<IDimensionData>({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0,
  });

  let interval: any = null;

  useEffect(() => {
    setLastValue(false);
    startWatching();
    isInViewPort();
    return stopWatching;
  }, [
    dimensions.rectTop,
    dimensions.rectBottom,
    dimensions.rectWidth,
    trigger,
  ]);

  const startWatching = () => {
    if (interval) {
      return;
    }

    interval = setInterval(() => {
      if (!myView || !myView.current) {
        return;
      }

      myView.current.measure(
        async (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setDimensions({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
          });
        },
      );
    }, 1000);
  };

  const stopWatching = () => {
    interval = clearInterval(interval);
  };

  const isInViewPort = () => {
    const window = Dimensions.get('window');
    const isVisible =
      dimensions.rectBottom != 0 &&
      dimensions.rectTop >= 0 &&
      dimensions.rectBottom <= window.height &&
      dimensions.rectWidth > 0 &&
      dimensions.rectWidth <= window.width;

    if (lastValue !== isVisible) {
      setLastValue(isVisible);
      onChange(isVisible);
    } else {
      onChange(isVisible);
    }
  };

  return (
    <RNView
      style={{width: '100%', height: '100%'}}
      collapsable={false}
      ref={myView}>
      {children}
      <View />
    </RNView>
  );
};

export default VisibilitySensor;
