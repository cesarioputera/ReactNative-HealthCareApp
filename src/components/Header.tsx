import { StyleSheet, Text } from 'react-native';
import { theme } from './Theme';

interface HeaderProps {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default Header;