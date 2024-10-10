import { View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { colors } from '../constants/colors';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
    size?: 'small' | 'default' | 'large';
    color?: string;
    percent: number; // Giá trị phần trăm
    duration?: number; // Thời gian animation (mili giây)
}

const ProgressBarComponent = (props: Props) => {
    const { size, color, percent, duration = 500 } = props; // Thêm tham số duration
    const heightContent = size === 'small' ? 6 : size === 'large' ? 10 : 8;

    // Khởi tạo giá trị animated
    const animatedWidth = useRef(new Animated.Value(0)).current;
    const safePercent = Math.min(Math.max(percent, 0), 100); // Đảm bảo percent nằm trong khoảng [0, 100]

    useEffect(() => {
        // Reset width về 0 trước khi bắt đầu animation
        animatedWidth.setValue(0);

        // Bắt đầu animation
        Animated.timing(animatedWidth, {
            toValue: safePercent,
            duration: duration, // Sử dụng giá trị duration
            useNativeDriver: false, // Không hỗ trợ animate width
        }).start();
    }, [safePercent, duration]);

    return (
        <View style={{ marginVertical: 12 }}>
            <View
                style={{
                    height: heightContent,
                    width: '100%',
                    backgroundColor: colors.blackBlur,
                    borderRadius: 100,
                }}>
                <Animated.View
                    style={{
                        backgroundColor: color ?? colors.green,
                        height: heightContent,
                        width: animatedWidth.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                        }),
                        borderRadius: 100,
                    }}
                />
            </View>
            <RowComponent justify='space-between'>
                <TextComponent text='Progress' size={14} styles={{ marginTop: 4 }} />
                <TextComponent font={fontFamilies.bold} flex={0} size={14} text={`${safePercent}%`} />
            </RowComponent>
        </View>
    );
};

export default ProgressBarComponent;
