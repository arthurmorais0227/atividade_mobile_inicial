import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_ExlxX0nDvcDyAxxr13VclUTZXh5MD9m54ZGzoUUtA5K1wdkmaEmYNIjE45CQbYCe";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function FilmesEditarScreen() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [selecionado, setSelecionado] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [diretor, setDiretor] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");

  const [salvando, setSalvando] = useState(false);

  async function buscarFilmes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/filmes", {
        params: { limit: 50 },
      });
      setFilmes(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os filmes. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarFilmes();
  }, []);

  function selecionarFilme(filme) {
    setSelecionado(filme);
    setTitulo(filme.title ?? "");
    setDescricao(filme.description ?? "");
    setImagemUrl(filme.imageUrl ?? "");
    setDiretor(filme.diretor ?? "");
    setDuracaoMinutos(filme.duracao_minutos ? String(filme.duracao_minutos) : "");
    setGenero(filme.genero ?? "");
    setAno(filme.ano ? String(filme.ano) : "");
    setNota(filme.nota ? String(filme.nota) : "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setSalvando(true);
    try {
      const minutosFormatados = parseInt(duracaoMinutos, 10);

      const resposta = await api.put(`/api/filmes/${selecionado.id}`, {
        title: titulo,
        description: descricao,
        imageUrl: imagemUrl || null,
        diretor: diretor,
        duracao_minutos: isNaN(minutosFormatados) ? 120 : minutosFormatados,
        genero: genero,
        status: "Lançado",
        nota: Number(nota),
        ano: Number(ano),
      });

      Alert.alert("Filme atualizado!", resposta.data.data?.title || resposta.data.title);

      setSelecionado(null);
      buscarFilmes();
    } catch (e) {
      console.log("Erro da API:", e.response?.data || e.message);
      const mensagemErro = e.response?.data?.message || e.response?.data?.error || "Verifique os dados enviados.";
      Alert.alert("Não deu pra atualizar o filme", mensagemErro);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Editar filme</Text>
          <Text style={styles.subtitulo}>PUT /api/filmes/:id</Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>Toque em um filme pra editar:</Text>

            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
            {erro && <Text style={styles.erro}>{erro}</Text>}

            {!carregando &&
              filmes.map((item) => (
                <Pressable key={item.id} style={styles.linha} onPress={() => selecionarFilme(item)}>
                  <Text style={styles.linhaTitulo}>{item.title}</Text>
                  <Text style={styles.linhaSeta}>editar ›</Text>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
              <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
            </Pressable>

            <Text style={styles.rotulo}>Título</Text>
            <TextInput
              style={styles.campo}
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ex: Batman"
            />

            <Text style={styles.rotulo}>Descrição</Text>
            <TextInput
              style={styles.campo}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Ex: Sinopse do filme"
            />

            <Text style={styles.rotulo}>URL da imagem</Text>
            <TextInput
              style={styles.campo}
              value={imagemUrl}
              onChangeText={setImagemUrl}
              placeholder="Ex: https://exemplo.com/filme.jpg"
            />

            <Text style={styles.rotulo}>Diretor</Text>
            <TextInput
              style={styles.campo}
              value={diretor}
              onChangeText={setDiretor}
              placeholder="Ex: Christopher Nolan"
            />

            <Text style={styles.rotulo}>Duração (minutos)</Text>
            <TextInput
              style={styles.campo}
              value={duracaoMinutos}
              onChangeText={setDuracaoMinutos}
              placeholder="Ex: 148"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Gênero</Text>
            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: Ação"
            />

            <Text style={styles.rotulo}>Ano</Text>
            <TextInput
              style={styles.campo}
              value={ano}
              onChangeText={setAno}
              placeholder="Ex: 2008"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Nota</Text>
            <TextInput
              style={styles.campo}
              value={nota}
              onChangeText={setNota}
              placeholder="Ex: 9.0"
              keyboardType="decimal-pad"
            />

            <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
              <Text style={styles.botaoTexto}>{salvando ? "Salvando..." : "Salvar alterações"}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#090922" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#f0a7ff" },
  subtitulo: { fontSize: 14, color: "#ffffff", marginTop: 2 },

  instrucao: { fontSize: 14, color: "#ffffff", marginBottom: 8 },
  erro: { color: "#ff6b6b", marginTop: 12 },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
  },
  linhaTitulo: { fontSize: 15, fontWeight: "700", color: "#102542" },
  linhaSeta: { fontSize: 13, color: "#8b2fc9", fontWeight: "600" },

  voltar: { marginBottom: 16 },
  voltarTexto: { color: "#f0a7ff", fontWeight: "700" },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#ffffff", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#f0a7ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    marginTop: 16,
    backgroundColor: "#f0a7ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});