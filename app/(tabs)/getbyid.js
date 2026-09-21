import { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Em produção, uma chave de API não deveria morar direto no código do
// app (dá pra extrair de qualquer APK/IPA instalado). Aqui, como é uma
// API pública de estudo, deixamos direto no código pra simplificar.
const API_KEY = "cv_ExlxX0nDvcDyAxxr13VclUTZXh5MD9m54ZGzoUUtA5K1wdkmaEmYNIjE45CQbYCe";

// Mesma instância do axios usada nas outras telas, com o header já
// configurado — toda chamada feita com "api" já sai autenticada.
const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY,
    },
});

// ---------- GET por id: buscar um filme específico ----------
export default function FilmesBuscarScreen() {
    const [id, setId] = useState("");
    const [filme, setFilme] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [erro, setErro] = useState(null);
    const [naoEncontrado, setNaoEncontrado] = useState(false);

    async function buscarPorId() {
        if (!id) {
            setErro("Digite um id pra buscar.");
            return;
        }

        Keyboard.dismiss();
        setBuscando(true);
        setErro(null);
        setNaoEncontrado(false);
        setFilme(null);

        try {
            // Sem params e sem .data.data: a rota de um item só devolve o
            // próprio objeto do filme direto no corpo da resposta.
            const resposta = await api.get(`/api/filmes/${id}`);
            setFilme(resposta.data);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setNaoEncontrado(true);
            } else {
                setErro("Não foi possível buscar o filme. Tenta de novo em instantes.");
            }
        } finally {
            setBuscando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Buscar filme</Text>
                    <Text style={styles.subtitulo}>GET /api/filmes/:id</Text>
                </View>

                <Text style={styles.rotulo}>Id do filme</Text>
                <View style={styles.linhaBusca}>
                    <TextInput
                        style={styles.campo}
                        value={id}
                        onChangeText={setId}
                        placeholder="Ex: 1"
                        keyboardType="numeric"
                    />
                    <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
                        <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
                    </Pressable>
                </View>

                {buscando && <ActivityIndicator style={{ marginVertical: 16 }} />}
                {erro && <Text style={styles.erro}>{erro}</Text>}

                {naoEncontrado && (
                    <Text style={styles.avisoNaoEncontrado}>
                        Nenhum filme encontrado com o id "{id}".
                    </Text>
                )}

                {filme && (
                    <View style={styles.card}>
                        {filme.imageUrl ? (
                            <Image source={{ uri: filme.imageUrl }} style={styles.imagem} />
                        ) : null}
                        <View style={styles.info}>
                            <Text style={styles.titulo}>{filme.title}</Text>
                            <Text style={styles.categoria}>
                                {filme.genero} · {filme.ano} · {filme.genero} 
                            </Text>
                            {filme.diretor ? (
                                <Text style={styles.detalhe}>Diretor: {filme.diretor}</Text>
                            ) : null}
                            {filme.nota !== undefined && filme.nota !== null ? (
                                <Text style={styles.detalhe}>Nota: ⭐ {filme.nota}</Text>
                            ) : null}
                            {filme.description ? (
                                <Text style={styles.descricao}>{filme.description}</Text>
                            ) : null}
                        </View>
                    </View>
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

  rotulo: { fontSize: 13, fontWeight: "600", color: "#ffffff", marginBottom: 4 },
  linhaBusca: { flexDirection: "row", gap: 8, alignItems: "center" },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#f0a7ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#f0a7ff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },

  erro: { color: "#ff6b6b", marginTop: 12 },
  avisoNaoEncontrado: { color: "#ffcc00", marginTop: 16, fontStyle: "italic" },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    backgroundColor: "#161638",
    borderRadius: 10,
    overflow: "hidden",
    padding: 12,
    borderWidth: 1,
    borderColor: "#332d59",
  },
  imagem: { width: 90, height: 120, borderRadius: 6 },
  info: { flex: 1, justifyContent: "flex-start", gap: 2 },
  titulo: { fontSize: 17, fontWeight: "700", color: "#f0a7ff" },
  categoria: { fontSize: 13, color: "#d1c4e9" },
  detalhe: { fontSize: 13, color: "#ffffff", marginTop: 2 },
  descricao: { fontSize: 13, color: "#b3b3cc", marginTop: 6, fontStyle: "italic" },
});