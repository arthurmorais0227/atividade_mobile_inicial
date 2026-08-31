import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
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

export default function FilmesCriarScreen() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");
    const [diretor, setDiretor] = useState("");
    const [duracaoMinutos, setDuracaoMinutos] = useState("");
    const [genero, setGenero] = useState("");
    const [ano, setAno] = useState("");
    const [nota, setNota] = useState("");

    const [enviando, setEnviando] = useState(false);

    async function criarFilme() {
        if (!titulo) {
            Alert.alert("Preencha pelo menos o título.");
            return;
        }

        setEnviando(true);
        try {
            const minutosFormatados = parseInt(duracaoMinutos, 10); //pesquisei na ia pq tava dando errado e ela me disse que é por que os minutos nao estavam como numero

            const resposta = await api.post("/api/filmes", {
                title: titulo,
                description: descricao,
                imageUrl: imagemUrl || null,
                diretor: diretor,
                duracao_minutos: isNaN(minutosFormatados) ? 120 : minutosFormatados,
                genero: genero,
                status: "Lançado",
                nota: Number(nota),
                ano: Number(ano)
            });

            Alert.alert("Filme criado!", resposta.data.title);
            setTitulo("");
            setDescricao("");
            setImagemUrl("");
            setDiretor("");
            setDuracaoMinutos("");
            setGenero("");
            setAno("");
            setNota("");
        } catch (e) {
            console.log("Erro da API:", e.response?.data || e.message);

            const mensagemErro = e.response?.data?.message || e.response?.data?.error || "Verifique os dados enviados.";

            Alert.alert("Erro ao criar filme", mensagemErro);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Criar filme</Text>
                    <Text style={styles.subtitulo}>POST /api/filmes</Text>
                </View>

                <Text style={styles.rotulo}>Título</Text>
                <TextInput
                    style={styles.campo}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ex: The King of Comedy"
                />

                <Text style={styles.rotulo}>Descrição</Text>
                <TextInput
                    style={styles.campo}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: Um drama sobre a realização de um homem ser comediante."
                />

                <Text style={styles.rotulo}>URL da imagem</Text>
                <TextInput
                    style={styles.campo}
                    value={imagemUrl}
                    onChangeText={setImagemUrl}
                    placeholder="Ex: https://exemplo.com/inception.jpg"
                />

                <Text style={styles.secao}>Campos específicos do tema filmes</Text>

                <Text style={styles.rotulo}>Diretor</Text>
                <TextInput
                    style={styles.campo}
                    value={diretor}
                    onChangeText={setDiretor}
                    placeholder="Ex: Akira Kurosawa"
                />

                <Text style={styles.rotulo}>Duração (minutos)</Text>
                <TextInput
                    style={styles.campo}
                    value={duracaoMinutos}
                    onChangeText={setDuracaoMinutos}
                    placeholder="Ex: 148"
                />

                <Text style={styles.rotulo}>Gênero</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Ex: Drama"
                />

                <Text style={styles.rotulo}>Ano</Text>
                <TextInput
                    style={styles.campo}
                    value={ano}
                    onChangeText={setAno}
                    placeholder="Ex: 1991"
                    keyboardType="numeric"
                />

                <Text style={styles.rotulo}>Nota</Text>
                <TextInput
                    style={styles.campo}
                    value={nota}
                    onChangeText={setNota}
                    placeholder="Ex: 8.5"
                    keyboardType="decimal-pad"
                />

                <Pressable style={styles.botao} onPress={criarFilme} disabled={enviando}>
                    <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar filme"}</Text>
                </Pressable>
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
    secao: {
        fontSize: 14,
        fontWeight: "700",
        color: "#f0a7ff",
        marginTop: 8,
        marginBottom: 8,
    },

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