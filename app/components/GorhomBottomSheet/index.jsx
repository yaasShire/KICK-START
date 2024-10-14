//
import { useCallback, useState, useRef } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, SafeAreaView, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, LAY_OUT, screenHeight } from '../../theme/globalStyle';
//
const GorhomBottomSheet = ({ snapPoints = ["80%"], children, sheetRef }) => {
    // hooks
    // const sheetRef = useRef(null);
    const insets = useSafeAreaInsets();
    //

    return (
        <BottomSheet
            ref={sheetRef}
            enablePanDownToClose
            snapPoints={snapPoints}
            index={-1}
            handleStyle={{ backgroundColor: "rgba(0, 0, 0, 0)", borderRadius: 30 }}
            // containerStyle={{ backgroundColor: currentBookStep == 0 || currentBookStep == 1 || currentBookStep == 2 ? "rgba(0, 0, 0, .5)" : 'rgba(0, 0, 0, 0)' }}
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} disappearsOnIndex={-1} enableTouchThrough={false} style={[{
                    height: screenHeight,
                    top: 0,
                    width: "100%",
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 1)"
                }]} />
            )}
        >
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <BottomSheetScrollView
                    style={[styles.container]}
                    contentContainerStyle={{ flex: 1, backgroundColor: COLORS.bg_secondary }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                >
                    {/* <View style={{ alignItems: "flex-end", paddingHorizontal: LAY_OUT.paddingX, backgroundColor: "#fff" }}>
                        <Pressable style={styles.closeButton} onPress={() => sheetRef?.current?.close()}>
                            <Ionicons name='close' size={21} />
                        </Pressable>
                    </View> */}
                    {children}
                    <SafeAreaView />
                </BottomSheetScrollView>
            </KeyboardAvoidingView>
        </BottomSheet>
    );
    //
};
//
export default GorhomBottomSheet;
//
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bg_primary,
    },
    closeButton: {
        backgroundColor: COLORS.bg_tertiary,
        borderRadius: 50,
        padding: 3
    },
});
//