import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';

import getRealm from '../../Data/realm';

export default function Form() {
  const [idEdit, setIdEdit] = useState(null);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const realm = await getRealm();
      const data = realm.objects('Produtos');
      setProdutos(data);
    }

    carregarProdutos();
  }, []);

  async function salvarProduto(data) {
    const realm = await getRealm();

    if (idEdit !== null) {
      editarProduto();
      return;
    }
    const id =
      realm.objects('Produtos').sorted('id', true).length > 0
        ? realm.objects('Produtos').sorted('id', true)[0].id + 1
        : 1;

    const dadosProdutos = {
      id: id,
      descricao: data.nome,
      quantidade: parseInt(data.quantidade),
      valor: parseInt(data.valor),
    };

    realm.write(() => {
      realm.create('Produtos', dadosProdutos);
    });
  }

  async function submitForm() {
    if (nome === '' || quantidade === '' || valor === '') {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    try {
      const data = {nome, quantidade, valor};
      await salvarProduto(data);
      setNome('');
      setQuantidade('');
      setValor('');
    } catch (error) {
      alert(error);
    }
  }

  function handleItem(data) {
    setNome(data.descricao);
    setQuantidade(String(data.quantidade));
    setValor(String(data.valor));
    setIdEdit(data.id);
  }

  async function editarProduto() {
    if (idEdit === null) {
      Alert.alert('Atenção', 'Não há produto para editar');
      return;
    }

    const realm = await getRealm();

    const response = {
      id: idEdit,
      descricao: nome,
      quantidade: parseInt(quantidade),
      valor: parseInt(valor),
    };

    await realm.write(() => {
      realm.create('Produtos', response, 'modified');
    });

    const produtosAlterados = await realm
      .objects('Produtos')
      .sorted('id', false);

    setProdutos(produtosAlterados);
    setNome('');
    setQuantidade('');
    setValor('');
    setIdEdit(null);
    Keyboard.dismiss();
    Alert.alert('Alteração', 'Produto alterado com sucesso');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário</Text>

      <Text style={styles.label}>Nome do produto:</Text>
      <TextInput
        placeholder="Nome do produto que será cadastrado"
        placeholderTextColor="#a1a1a1"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        placeholder="0"
        placeholderTextColor="#a1a1a1"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Text style={styles.label}>Valor:</Text>
      <TextInput
        placeholder="100"
        placeholderTextColor="#a1a1a1"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.buttonTitle}>Salvar Formulário</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <RenderList item={item} handleItem={handleItem} />
        )}
      />
    </View>
  );
}

function RenderList({item, handleItem}) {
  return (
    <View
      style={{
        width: 330,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        margin: 10,
        borderRadius: 8,
        padding: 8,
      }}>
      <TouchableOpacity onLongPress={() => handleItem(item)}>
        <Text>ID: {item.id}</Text>
        <Text>Descrição: {item.descricao}</Text>
        <Text>Valor: R${item.valor}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
      </TouchableOpacity>
    </View>
  );
}
