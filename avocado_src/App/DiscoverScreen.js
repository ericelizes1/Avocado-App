import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';

export default function DiscoverScreen() {
  const [menuVisible, setMenuVisible] = useState(true);
  const scrollOffset = new Animated.Value(0);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50 && menuVisible) {
      setMenuVisible(false);
    } else if (offsetY <= 50 && !menuVisible) {
      setMenuVisible(true);
    }
    scrollOffset.setValue(offsetY);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.menu, { opacity: menuVisible ? 1 : 0 }]}>
        <Header
          centerComponent={{ text: 'Menu', style: { color: '#fff' } }}
          backgroundColor="blue"
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>Discover Screen</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel ex
            eget tellus imperdiet vestibulum ac vitae sapien. Duis malesuada
            eleifend lorem, a bibendum nibh tincidunt ac. Nullam tincidunt ante
            vel elit volutpat, non maximus ex semper. Donec non suscipit
            mauris. Morbi nec malesuada eros. Praesent eget enim felis. Donec
            gravida quam vel ipsum bibendum eleifend. Sed lacinia efficitur
            dolor, vel ultrices quam suscipit a.
          </Text>
          <Text style={styles.paragraph}>
            Maecenas vel efficitur turpis. Integer maximus finibus convallis.
            Integer auctor tincidunt libero, non aliquam nulla euismod sed.
            Nullam facilisis, leo nec dignissim tincidunt, sapien ex viverra
            mauris, quis mollis ex velit ut velit. Maecenas efficitur odio nec
            elit malesuada, eu semper justo aliquet. Donec a diam ut diam
            faucibus ultrices.
          </Text>
          <Text style={styles.paragraph}>
            Aenean dictum, ipsum vel bibendum elementum, lorem enim facilisis
            nunc, in dapibus tellus odio vitae felis. Sed bibendum sem a nulla
            tincidunt, eget volutpat risus lobortis. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Vivamus in ullamcorper orci, sit amet rutrum odio. Ut interdum
            risus et        congue. Nunc malesuada sapien vel ex tristique, a malesuada nibh
        tincidunt. Sed pharetra ante ac varius ullamcorper. Nam vel
        pellentesque lacus. Quisque non ligula vel nisi volutpat auctor vel
        in est. In lobortis enim et nisl bibendum, sit amet bibendum felis
        blandit.
      </Text>
    </View>
  </ScrollView>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
menu: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
height: 50,
zIndex: 1,
},
content: {
padding: 16,
},
heading: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 16,
},
paragraph: {
fontSize: 16,
marginBottom: 16,
},
});
