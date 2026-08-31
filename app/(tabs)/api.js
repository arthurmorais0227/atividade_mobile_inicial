import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios" // lib usada pra fazer chamadas HTTP para API
import { SafeAreaView } from "react-native-safe-area-context" // evita que conteudo fique embaixo do notch/barra do celular

const API_KEY = "cv_ExlxX0nDvcDyAxxr13VclUTZXh5MD9m54ZGzoUUtA5K1wdkmaEmYNIjE45CQbYCe"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY 
    }
})

export default function FilmesListarScreen() {
    const [filmes, setFilmes] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarFilmes() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/filmes", {
                params: { limit: 50 }
            })
            setFilmes(resposta.data.data)
        } catch (error) {
            setErro("Não foi possivel carregar filmes")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarFilmes()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar filmes</Text>
                    <Text style={styles.subtitulo}>GET /api/filmes</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    filmes.map((filme) => (
                        <View key={filme.id} style={styles.card}>
                            <Image source={{ uri: filme.imageUrl }} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{filme.title}</Text>
                                <Text style={styles.categoria}>
                                    {filme.genero} · {filme.ano}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#090922" 
  }, 
  conteudo: { 
    padding: 24, 
    paddingBottom: 48 
  }, 
  header: { 
    marginBottom: 16 
  }, 
  tituloPagina: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#f0a7ff" 
  }, 
  subtitulo: { 
    fontSize: 14, 
    color: "#ffffff", 
    marginTop: 2 
  }, 

  erro: { 
    color: "#ff5555", 
    marginTop: 12 
  }, 
  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    backgroundColor: "#090922", 
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0a7ff", 
    padding: 10, 
  },
  imagem: { 
    width: 64, 
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0a7ff" 
  }, 
  info: { 
    flex: 1, 
    justifyContent: "center", 
    paddingRight: 12 
  }, 
  titulo: { 
    fontSize: 16, 
    fontWeight: "700",
    color: "#ffffff" 
  }, 
  categoria: { 
    fontSize: 13, 
    color: "#f0a7ff" 
  },
});