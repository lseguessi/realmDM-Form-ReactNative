import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 8,
    height: 46,
    width: '90%',
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    fontSize: 18,
    marginTop: 15,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#13bc',
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
