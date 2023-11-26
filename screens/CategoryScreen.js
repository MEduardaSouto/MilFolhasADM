import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text } from '@rneui/base';
import CustomInputDialogModal from './CustomInputDialogModal';
import { fetchListas, adicionarLista, removerLista } from '../actions/listActions';

const CategoryScreen = ({ navigation }) => {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const listasData = await fetchListas();
      setListas(listasData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAdicionarLista = () => {
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
  };

  const handleDialogSubmit = async (nome) => {
    setDialogVisible(false);
    try {
      setLoading(true);
      const novaLista = await adicionarLista(nome);
      setListas([...listas, novaLista]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRemoverLista = async (id) => {
    try {
      setLoading(true);
      await removerLista(id);
      setListas(listas.filter((lista) => lista.id !== id));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {listas.length > 0 ? (
              listas.map((lista) => (
                <View style={styles.listItem} key={lista.id}>
                  <Button
                    title={lista.name}
                    onPress={() => navigation.navigate('Lista', { category: lista.name })}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                  />
                  <Button
                    title='x'
                    buttonStyle={{
                      width: '25%',
                      height: 70,
                      opacity: 0.7,
                    }}
                    onPress={() => handleRemoverLista(lista.id)}
                    containerStyle={styles.buttonContainer}
                  />
                </View>
              ))
            ) : (
              <View>
                <Text style={styles.noListText}>Nenhuma área encontrada.</Text>
              </View>
            )}
          </>
        )}
      </View>
      <Button
        title="Adicionar área"
        onPress={handleAdicionarLista}
        type="outline"
        containerStyle={styles.buttonAdd}
      />
      <CustomInputDialogModal
        visible={dialogVisible}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  topRightContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginRight: '0.5%',
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    height: 70,
  },
  buttonAdd: {
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '80%',
  },
  noListText: {
    marginBottom: 20,
  },
});

export default CategoryScreen;
